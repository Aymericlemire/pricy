from playwright.sync_api import sync_playwright
import json
import time

produits = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=50)
    page = browser.new_page()
    page.goto("https://world.davines.com/collections/all-products", timeout=60000)

    # Accepter le bandeau de consentement si présent
    try:
        page.locator("button:has-text('Accepter tout')").click(timeout=5000)
        print("✅ Consentement accepté via 'Accepter tout'")
    except Exception as e:
        print("ℹ️ Pas de bouton 'Accepter tout' détecté ou déjà géré.")

    # Charger tous les produits via "Load More Products"
    print("🔁 Chargement des produits...")
    while True:
        try:
            button = page.query_selector("button.load-more")
            if not button or not button.is_visible():
                print("⛔️ Plus de bouton Load More visible")
                break
            print("↪️ Clique sur Load More")
            button.click()
            time.sleep(2)
        except:
            break

    # Utiliser les liens directs vers les produits
    liens = page.query_selector_all("a.hidden-product-link")
    print(f"🔍 {len(liens)} liens de produits trouvés")

    for lien in liens:
        try:
            nom = lien.inner_text().strip()
            href = lien.get_attribute("href")
            full_url = "https://world.davines.com" + href

            detail_page = browser.new_page()
            detail_page.goto(full_url, timeout=60000)
            try:
                detail_page.wait_for_selector(".product__description", timeout=10000)
                description_elem = detail_page.query_selector(".product__description")
                description = description_elem.inner_text().strip() if description_elem else "Non renseignée"
            except:
                description = "Non disponible"

            prix_elem = detail_page.query_selector(".price-item--regular")
            prix_text = prix_elem.inner_text().strip() if prix_elem else "0.00"
            prix = float(prix_text.replace("€", "").replace(",", ".").replace(" ", ""))

            image_elem = detail_page.query_selector(".product__media img")
            image = image_elem.get_attribute("src") if image_elem else ""

            produits.append({
                "nom": nom,
                "image": "https:" + image if image.startswith("//") else image,
                "url": full_url,
                "prix": prix,
                "description": description
            })

            print(f"✅ {nom} ajouté")
            detail_page.close()

        except Exception as e:
            print(f"⚠️ Erreur sur un produit : {e}")

    browser.close()

with open("produits-davines.json", "w", encoding="utf-8") as f:
    json.dump(produits, f, indent=2, ensure_ascii=False)

print(f"🎉 Terminé ! {len(produits)} produits exportés dans produits-davines.json")
