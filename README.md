## Fonctionnalités réalisées

* Récupérer la liste des personnes en tendance :  OUI
* Charger plus de résultats : OUI
* Récupérer la liste des personnes avec une recherche : OUI
* Annuler une recherche : NON
* Naviguer vers la page de détails (depuis la recherche) : OUI
* Afficher les informations de base : OUI
* Afficher la liste des médias : OUI
* Mettre / enlever des favoris : 
* Avoir 2 tabs (recherche et favoris) : OUI
* Affichage des favoris : 
* Naviguer vers la page de détails (depuis les favoris) : OUI

## Remarques éventuelles

**Merci d'indiquer si vous avez fait l'exercice sur téléphone ou émulateur.**

Réalisé sur Téléphone

**Ajouter vos remarques ici si besoin**

Problème de compilation irrésolvable : demande de reset du cache de metro car il ne trouve pas la librairie @react mais commande impossible à executer. Impossibilité de vérifier le code produit => code à l'aveugle

Commande qu'il faudrait executer mais qui renvoit des erreurs: 

watchman watch-del-all

delete node_modules and run yarn install

yarn start --reset-cache 

rm -rf /tmp/metro-*
