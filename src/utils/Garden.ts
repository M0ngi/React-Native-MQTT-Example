interface GardenInfo{
    name: string;
    mqtt_id: string;
}

export class Garden{
    private gardenInfo : GardenInfo;
    public constructor(info : GardenInfo){
        this.gardenInfo = info;
    }

    public get name(){
        return this.gardenInfo.name;
    }

    public get mqtt_id(){
        return this.gardenInfo.mqtt_id;
    }
}