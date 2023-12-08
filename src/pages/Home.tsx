import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseApiUrl } from '../lib/GlobalVar';
import { useLocation } from 'react-router'

const Home: React.FC = () => {
  const [data, setData] = useState(null);
  const location = useLocation()

  const getApiData = () => {
    axios({
      method: "GET",
      url: `${BaseApiUrl}/api/buku`,
    }).then((response)=>{
      const data = response.data
      setData(data.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  } 

  useEffect(()=>{
    getApiData()
  }, [location.key])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Test Consume Api</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Test Consume Api</IonTitle>
          </IonToolbar>
        </IonHeader>
        {data ? (
          data.map((e) => (
            <IonItem button routerLink={`/detail-buku/${e.id_buku}`} key={e.id_buku}>Judul Buku  : {e.judul_buku}</IonItem>
          ))
        ) : (
          <IonItem>Loading...</IonItem>
        )}
        <IonButton className='ion-margin' routerLink='/tambahbuku'>
          Tambah buku
        </IonButton>
      </IonContent> 
    </IonPage>
  );
};

export default Home;
