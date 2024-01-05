import React, { useRef } from 'react';
import './Home.css';
import Header from '../shared/Header';
import Showcase from '../shared/Showcase';
import WhyUs from '../shared/WhyUs';
import Steps from '../shared/Steps';
import NosService from '../shared/NosService';
import Reservation from '../shared/Reservation';
import Footer from '../shared/Footer';

function Home() {

  const targetReservation = useRef();

  return (
    <div className='home_container'>
        <Header targetRef={targetReservation} />
        <Showcase targetRef={targetReservation} />
        <WhyUs />
        <Steps targetRef={targetReservation} />
        <NosService targetRef={targetReservation} />
        <Reservation ref={targetReservation} />
        <Footer />

        <div style={{ display: 'none' }}>

          Services de nettoyage Casablanca
          Service de femme de ménage Rabat
          Service de femme de ménage à Maarif
          Service de femme de ménage à Agdal
          Services de femme de ménage à Bouskoura
          Service de nettoyage Dar bouazza
          Services de nettoyage à Aïn Diab
          Service de femme de ménage à Hassan
          Service de nettoyage à Bourgogne
          Service de nettoyage à Souissi
          Nettoyage à Casablanca
          Femme de ménage Casablanca
          Femme de ménage Maroc casablanca
          Nettoyage de bureaux Casablanca
          Nettoyage de locaux Casablanca
          Nettoyage fin de chantier Casablanca
          Nettoyage après travaux Casablanca
          Nettoyage appartements Casablanca
          Nettoyage maisons Casablanca
          Nettoyage villas Casablanca
          Nettoyage industriel Casablanca
          Nettoyage résidences Casablanca
          Nettoyage immeubles Casablanca
          Nettoyage de moquette Casablanca
          Nettoyage de parquet Casablanca
          Nettoyage hôtels Casablanca
          Nettoyage restaurants Casablanca
          Nettoyage vitres Casablanca
          Start-up maroc
          Nettoyage canapés à casablanca maroc
          produit nettoyage canape maroc
          nettoyage canape a domicile prix
          nettoyage canape marrakech
          nettoyage canape a domicile rabat
          nettoyage canape a domicile tanger
          nettoyage canape a domicile marrakech
          societe de gardiennage et nettoyage a casablancalavage de canape
          nettoyage canapé à domicile prix
          produit nettoyage canapé maroc
          nettoyage canapé à domicile rabat
          nettoyage canapé à domicile tanger
          Nettoyage canapé
          nettoyage canapé à domicile
          odeur du canapé
          Taches de thé ou de café
          taches de jus
          Taches de stylo à bille
          Taches de graisse
          taches de sang
          avito femme de menage casablanca
          femme de menage bouznika
          femme de menage avito
          femme de menage cuisiniere casablanca
          femme de ménage maroc
          Femme de ménage Casablanca
          tarif femme de ménage casablanca
          société de femme de ménage
          femme de ménage bouznika
          maroc annonce femme de menage casablanca
          femme de menage maroc prix
          femme de menage maroc annonce
          agence femme de menage casablanca
          samsara femme de menage
          femme de ménage maroc prix
          femme de ménage maroc annonce
          femme de menage maroc salaire
          smig femme de menage maroc
          agence femme de menage maroc
          salaire moyen femme de menage maroc
          loi femme de menage maroc
          salaire femme de menage maroc
          uniforme femme de menage maroc
          femmes de menage maroc
          samsar femme de ménage casablanca 

          agence femme de ménage casablanca
          Service de nettoyage de déménagement à Anfa
          Services de nettoyage à Agdal
          Services de nettoyage à Hay Riad
          Services de nettoyage à Belveder
          Service de nettoyage à Gauthier
          Service de nettoyage à 2 Mars
          Service de nettoyage à Maârif
          Services de ménage à Racine
          Service de nettoyage d'appartement à Agdal
          garde personne âgée casablanca
          agence de service a la personne casablanca recrutement
          femme de menage a domicile
          femme de ménage à domicile
          je cherche une femme de menage urgent
          recrutement femme de menage hopital
          recrutement femme de menage bureau
          recrutement femme de menage
          agence de recrutement femme de menage
          agence de recrutement femme de menage rabat
          recrutement femme de menage college
          demande demploi femme de menage casablanca
          famille europeenne cherche femme de menage
          je cherche du travail femme de ménage
          demande d'emploi femme de ménage casablanca
          je cherche une femme de menage urgent casablanca
          cherche femme de ménage urgent
          offre demploi femme de menage pour bureau
          offre demploi pour femme de menage
          offre d'emploi femme de ménage maroc
          offre d'emploi pour femme de ménage
          cherche travail femme de menage a rabat
          je cherche un travail femme de menage a casablanca
          je cherche du travail comme femme de menage a casablanca
          offre demploi femme de menage avito a casa
          offre emploi femme ménage chez les europeens
          je cherche du travail comme femme de ménage à casablanca
          je cherche du travail comme femme de menage
          recherche emploi femme de menage a domicile
          recherche femme de menage urgent
          femme de menage pour bureau casablanca
          femme de ménage pour bureau casablanca
          offre d'emploi femme de menage pour bureau casablanca
          offre d'emploi femme de menage pour bureau maroc
          offre d'emploi femme de menage pour bureau
          Electricien à casablanca
          Plombier à casablanca
          Garde enfants à casablanca
          Montage des meubles casablanca
          societe de nettoyage maroc
          tarif nettoyage au maroc
          nettoyage industriel casablanca
          societe de nettoyage professionnel
          secteur de nettoyage au maroc
          societe de nettoyage industriel
          femme de menage a domicile casablanca
          samsara femme de menage
          femme de menage casablanca avito
          agence de femme de menage
          maroc annonce femme de menage casablanca
          cherche travail comme femme de menage a casablanca
          Nettoyage de Mosaïque Casablanca
          Nettoyage restaurants casablanca
          Nettoyage de Tapis Casablanca
          societe de nettoyage professionnel casablanca
          cherche femme de menage urgent
          nettoyage canape a domicile
          nettoyage de fauteuil a domicile
          lavage vapeur maroc
          nettoyage a domicile maroc
          devis entreprise nettoyage au maroc 

          nettoyage moquette casablanca
          femme de ménage bouskoura
          casa nana casablanca
          massage casablanca
          service de nettoyage a domicile
          cherche femme de menage urgent
          service nettoyage
          societe de nettoyage professionnel
          ste de nettoyage
          Service de nettoyage de maison à Anfa
          Services de femme de ménage à Californie
          Services de nettoyage de maison à Souissi
          Services de nettoyage de maison à Hay Riad
          Service de nettoyage à Sidi maarouf
          Service de nettoyage à Oasis
          Services de nettoyage à Yacoub El Mansour
          Service de nettoyage de maison à Sidi Maarouf
          Services de ménage à Agdal
          femme de ménage
          agence de femme de menage casablanca
          prix femme de menage casablanca
          agence recrutement femme de menage casablanca
          societe femme de menage casablanca
          demande d'emploi femme de menage casablanca
          cherche femme de menage casablanca
          nounou femme de menage casablanca
          femmes de menage casablanca
          femme menage casablanca demande demploi
          femme de menage mi temps casablanca
          femme menage casablanca demande d'emploi
          samsara femme de ménage
          femme de ménage mi temps casablanca
          maroc annonce casablanca
          maroc annonce femme de menage aujourdhui a marrakech
          annonce maroc pour femme de menage
          maroc annonce femme de menage tanger
          maroc annonce marrakech femme de menage
          maroc annonce femme de menage rabat
          je cherche du travail femme de menage
          cherche femme de menage urgent	
          maroc annonce femme de ménage aujourd'hui à marrakech
          femme de menage bouskoura
          agence de femme de ménage casablanca
          allo femme de menage casablanca prix
          allo femme de menage casablanca tarif
          allo femme de menage casablanca telephone
          agence nounou casablanca
          femme de menage a domicile casablanca
          garde personne agee casablanca
          femme de ménage à domicile casablanca
          cuisinière à domicile casablanca
          femme de menage maroc
          femme de menage casablanca
          societe de nettoyage a domicile
          societe de nettoyage industriel
          Nettoyage industriel Casablanca
          cherche femme de menage de particulier a particulier
          cherche femme de menage a casablanca
          cherche femme de menage et nounou casablanca
          cuisinière à domicile casablanca
          cherche femme de menage meknes
          je cherche femme de menage a casablanca
          je cherche femme de menage
          entreprise cherche femme de menage
          je cherche femme de menage alger centre
          cherche travail femme de menage
          cherche une femme de menage
          maid cleaning
          je cherche femme de menage a casablanca
          cherche travail femme de menage bureaux
          cherche emploi comme femme de menage
          tarif femme de menage casablanca
          societe de femme de menage 

        </div>
    </div>
  )
}

export default Home