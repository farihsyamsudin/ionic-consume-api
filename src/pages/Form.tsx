import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import {  useState } from 'react';
import axios from 'axios';
import { BaseApiUrl } from "../lib/GlobalVar";
import { useHistory } from 'react-router';


const Form: React.FC = () => {
  const [judulBuku, setJudulBuku] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [status, setStatus] = useState(0);
  const [stok, setStok] = useState(0);
  const history = useHistory()

  const dataToSend = {
    judul_buku : judulBuku,
    penulis : penulis,
    penerbit : penerbit,
    status : status,
    stok : stok
  }
  
  function sendDataBuku(){
      axios.post(`${BaseApiUrl}/api/buku/create`, dataToSend, {
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
      }
    })
    .then(function (response) {
      history.push('/home')
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Test Consume Api</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>        
        <div className='ion-padding'>
          <h1>Masukkan Data Buku Baru</h1>
          <IonItem>
            <IonLabel>Judul Buku :</IonLabel>
            <IonInput onIonChange={(e) => setJudulBuku(e.detail.value)} value={judulBuku} />
          </IonItem>
          <IonItem>
            <IonLabel>Penulis :</IonLabel>
            <IonInput onIonChange={(e) => setPenulis(e.detail.value)} value={penulis} />
          </IonItem>
          <IonItem>
            <IonLabel>Penerbit :</IonLabel>
            <IonInput onIonChange={(e) => setPenerbit(e.detail.value)} value={penerbit} />
          </IonItem>
          <IonItem>
            <IonLabel>Status :</IonLabel>
            <IonSelect placeholder='Tersedia / Tidak' onIonChange={(e)=> setStatus(parseInt(e.detail.value))}>
              <IonSelectOption value={1}>Tersedia</IonSelectOption>
              <IonSelectOption value={0}>Tidak Tersedia</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Stok :</IonLabel>
            <IonInput type='number' onIonChange={(e) => setStok(parseInt(e.detail.value))} value={stok} />
          </IonItem>
          <IonButton onClick={sendDataBuku} className='ion-margin'>
            Simpan Data Buku
          </IonButton>
        </div>
      </IonContent> 
    </IonPage>
  );
};

export default Form;
