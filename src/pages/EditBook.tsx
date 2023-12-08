import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios"
import { BaseApiUrl, BaseUrlApp } from "../lib/GlobalVar"
import { Redirect, useHistory, useParams  } from "react-router"
import { useEffect, useState } from "react";

interface RouteParams {
    id:string;
}

const EditBook = () => {
    const [data, setData] = useState(null)
    const [judulBuku, setJudulBuku] = useState("");
    const [penulis, setPenulis] = useState("");
    const [penerbit, setPenerbit] = useState("");
    const [status, setStatus] = useState(0);
    const [stok, setStok] = useState(0);
    const history = useHistory()

    const { id } = useParams<RouteParams>()

    const getInstanceValue = () => {
        axios({
          method: "GET",
          url: `${BaseApiUrl}/api/buku/${id}`,
        }).then((response)=>{
            setJudulBuku(response.data.detail_book.judul_buku)
            setPenulis(response.data.detail_book.penulis)
            setPenerbit(response.data.detail_book.penerbit)
            setStatus(response.data.detail_book.status)
            setStok(response.data.detail_book.stok)
        }).catch((error) => {
          if (error.response) {
            if (error.response && error.response.status === 404) {
                // window.location.href = `${BaseUrlApp}/home`
                history.push('/home')
            }
          }
        })
    }

    const editBook = () => {
        let dataToEdit = {
            judul_buku : judulBuku,
            penulis : penulis,
            penerbit : penerbit,
            status : status,
            stok : stok
        }

        console.log(dataToEdit)

        axios.put(`${BaseApiUrl}/api/buku/edit/${id}`, dataToEdit).then((response) => {
            alert(response.data.message)
            history.push(`/detail-buku/${id}`)
        })
    }

    useEffect(() => {
        getInstanceValue()
    }, [id])
    

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Test Consume Api</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <div className='ion-padding'>
                <h1>Edit Data Buku</h1>
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
                    <IonSelect value={status} placeholder='Tersedia / Tidak' onIonChange={(e)=> setStatus(parseInt(e.detail.value))}>
                        <IonSelectOption value={1}>Tersedia</IonSelectOption>
                        <IonSelectOption value={0}>Tidak Tersedia</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel>Stok :</IonLabel>
                    <IonInput type='number' onIonChange={(e) => setStok(parseInt(e.detail.value))} value={stok} />
                </IonItem>
                <IonButton onClick={editBook}  className='ion-margin'>
                    Simpan Data Buku
                </IonButton>
            </div>
            </IonContent>
        </IonPage>
    )
}

export default EditBook