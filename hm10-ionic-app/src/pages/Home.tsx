import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import './Home.css';
import { BLE } from '@awesome-cordova-plugins/ble'
import { useCallback } from 'react';
import { DeviceData } from '../models/DeviceData';

const Home: React.FC = () => {
  /** HM-10のMAC ADDRESS */
  //const MAC_ADDRESS: string = 'DB457B9E-7D59-4EE2-42FA-B8EDC1DABF52';
  //const MAC_ADDRESS: string = 'F52D143C-4F0F-0A28-4F9B-EA2B4F7F337A';
  //ipad
  const MAC_ADDRESS: string = '7449DE88-5C2B-1841-91C6-E16E89BDAA55';
  const SERVICE_UUID: string = 'FFE0';
  const CHAR_UUID: string = 'FFE1';

  const [presentToast] = useIonToast();

  const connect = useCallback(() => {
    BLE.connect(MAC_ADDRESS).subscribe(obj => {
      const str: string = JSON.stringify(obj);
      const data: DeviceData = JSON.parse(str);
      console.log(data);
      presentToast({ message: `connected:${MAC_ADDRESS}`, duration: 1500 });
    });
  }, [MAC_ADDRESS, presentToast]);

  const disconnect = useCallback(() => {
    BLE.isConnected(MAC_ADDRESS).then(
      () => {
        BLE.disconnect(MAC_ADDRESS);
        presentToast({ message: `disconnect:${MAC_ADDRESS}` });
      });
  }, [presentToast]);



  const send = useCallback(async (data: Uint8Array): Promise<void> => {
    console.log('send:');
    console.log(data);
    try {
      await BLE.write(MAC_ADDRESS, SERVICE_UUID, CHAR_UUID, data.buffer);
    } catch (e) {
      //tryで囲っておかないと以下のエラーを吐いて以上終了してしまう。
      //Error Domain=CBATTErrorDomain Code=10 "The attribute could not be found." UserInfo={NSLocalizedDescription=The attribute could not be found.}
    }
  }, []);

  const stop = useCallback(async (): Promise<void> => {
    const data: Uint8Array = new Uint8Array(1);
    data[0] = 0x00;
    await send(data);
  }, [send]);

  const forward = useCallback(async (): Promise<void> => {
    const data: Uint8Array = new Uint8Array(1);
    data[0] = 0x01;
    await send(data);
  }, [send]);

  const back = useCallback(async (): Promise<void> => {
    const data: Uint8Array = new Uint8Array(1);
    data[0] = 0x02;
    await send(data);
  }, [send]);

  const waitSecond = useCallback(async (second: number): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, second);
    });
  }, []);

  const forward_back = useCallback(async (): Promise<void> => {
    await forward();
    await waitSecond(1000);
    await stop();
    await waitSecond(1000 * 2);
    await back();
    await waitSecond(1000);
    await stop();
    await waitSecond(1000 * 2);
  }, [forward, stop, waitSecond, back]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton onClick={connect}>
                Connect
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton onClick={disconnect}>
                Disconnect
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton onClick={stop}>
                Stop
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton onClick={forward}>
                Forward
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton onClick={back}>
                Back
              </IonButton>
            </IonCol>

            <IonCol>
              <IonButton onClick={forward_back}>
                Forward&Back
              </IonButton>
            </IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
