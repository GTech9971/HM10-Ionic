import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { BLE } from '@awesome-cordova-plugins/ble'
import { useCallback } from 'react';
import { DeviceData } from '../models/DeviceData';
import { format } from 'date-fns';

const Home: React.FC = () => {
  /** HM-10のMAC ADDRESS */
  const MAC_ADDRESS: string = 'DB457B9E-7D59-4EE2-42FA-B8EDC1DABF52';
  const SERVICE_UUID: string = 'FFE0';
  const CHAR_UUID: string = 'FFE1';

  const connect = useCallback(() => {
    BLE.connect(MAC_ADDRESS).subscribe(obj => {
      const str: string = JSON.stringify(obj);
      const data: DeviceData = JSON.parse(str);
      console.log(data);
    });
  }, [MAC_ADDRESS]);

  const send = useCallback(() => {
    const msg: string = 'hello - ' + format(new Date(), 'yyyy/MM/dd');

    const data: Uint8Array = new Uint8Array(msg.length);
    for (let i = 0; i < data.length; i++) {
      data[i] = msg.charCodeAt(i);
    }
    console.log('send:' + msg);
    BLE.write(MAC_ADDRESS, SERVICE_UUID, CHAR_UUID, data.buffer);

    BLE.read(MAC_ADDRESS, SERVICE_UUID, CHAR_UUID).then(rec => {
      const data: Uint8Array = rec as Uint8Array;
      const decoder: TextDecoder = new TextDecoder();
      console.log('rec:' + decoder.decode(data));
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Blank
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton onClick={connect}>
                Connect
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton onClick={send}>
                Send
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
