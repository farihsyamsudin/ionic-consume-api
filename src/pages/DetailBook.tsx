import { IonButton, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router";
import './DetailBook.css'
import { BaseApiUrl, BaseUrlApp } from "../lib/GlobalVar";


interface RouteParams {
    id:string;
}

const DetailBook = () => {
    const [data,setData] = useState(null)
    const { id } = useParams<RouteParams>()
    const history = useHistory()
    const location = useLocation()
    
    const getDetailBook = () => {
        axios({
          method: "GET",
          url: `${BaseApiUrl}/api/buku/${id}`,
        }).then((response)=>{
          setData(response.data.detail_book)
        }).catch((error) => {
          if (error.response) {
            if (error.response && error.response.status === 404) {
                history.push('/home');
            }
          }
        })
    }

    const handleConfirm = () => {
        if(confirm(`Apakah Anda yakin menghapus data buku ${data.judul_buku}`)){
            axios.delete(`${BaseApiUrl}/api/buku/delete/${id}`).then((response)=>{
                alert(response.data.message)
                return (
                    // window.location.href = `${BaseUrlApp}/home`
                    history.push('/home')
                )
            }).catch((error) => {
                console.log(error.response.status)
            })
        }
    }

    useEffect(() => {
        getDetailBook()
    }, [id, location.key])

    if (data != null) {
        if (data.status == 1) {
            data.status = "Tersedia"
        } else if (data.status == 0){
            data.status = "Tidak Tersedia"
        }
    }

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Detail Book</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {data ? (
                    <div className="ion-padding">
                        <h1 className="heading-detail-book">Detail Buku {data.judul_buku}</h1>
                        <div>
                        
                            <IonList>
                                <IonItem>Penulis : {data.penulis}</IonItem>
                                <IonItem>Penerbit : {data.penerbit}</IonItem>
                                <IonItem>Status : {data.status}</IonItem>
                                <IonItem>Stok : {data.stok}</IonItem>
                            </IonList>

                        </div>
                        <IonButton onClick={handleConfirm} className="ion-margin" color="danger">
                            Hapus
                        </IonButton>
                        <IonButton routerLink={`/edit-buku/${data.id_buku}`} color="warning">
                            Edit
                        </IonButton>
                    </div>
                ) : (
                    <IonItem>Loading...</IonItem>
                )}
            </IonContent>
        </IonPage>
    )
}

export default DetailBook