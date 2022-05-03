import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MQTTCategories } from '../../const/MQTT';
import { CurrentUser } from '../../utils/CurrentUser';
import { getPathDetails } from '../../utils/mqtt';
import { SmartGardenClient } from '../../utils/SmartGardenClient';

export default function HomeScreen(){
  const [temperature, setTemperature] = useState("");
  const [water, setWater] = useState("");

  useEffect(()=>{
    const MQTT = SmartGardenClient.login(CurrentUser.userData?.mqttCreds);
    SmartGardenClient.subscribe(CurrentUser.gardens);

    MQTT.on('message', (topic, content)=>{
      const topicInfo = getPathDetails(topic);
      switch(topicInfo.category){
        case MQTTCategories.temp:{
          setTemperature(content.toString());
          break;
        }
        case MQTTCategories.water:{
          setWater(content.toString());
          break;
        }
      }
      //console.log('topic: ' + topic);
      //console.log('content: ' + content);
    })
  }, [SmartGardenClient.isConnected]);

  return (
    <SafeAreaView>
      <Text style={{fontSize: 35, marginTop: 50}}>Temperature: {temperature}</Text>
      <Text style={{fontSize: 35}}>Water: {water}</Text>
    </SafeAreaView>
  );
}
