


enum MyEnum {
    //% block="Temp"
    Temp,
    //% block="Humidity"
    Humidity
}

/**
 * 温度和湿度的图形化
 */
//% weight=100 color=#0fbc11 icon="" block="Temp And Humidity"
namespace tempAndHumidity {
    let addr = 0x17
    /**
     * TODO: 获取温度和湿度
     * @param e 获取温度和湿度
     */
    //% block="read %myStatic"
    //%weight=99
    export function tempHumidity(myStatic: MyEnum): number {
        pins.i2cWriteNumber(addr, 0x03, NumberFormat.Int8LE);
        basic.pause(50);
        let buffer = pins.i2cReadBuffer(addr, 4);
        let myData
        switch (myStatic){
            case MyEnum.Temp:
                myData = buffer[0];
            break;
            case MyEnum.Humidity:
                myData = buffer[2];
            break;
            default:
                myData = 0;
        }
        return myData;
    }

    /**
     * TODO: 获取版本号
     */
    //% block="read version"
    //%weight=98
    export function version(): string {
        pins.i2cWriteNumber(addr, 0x00, NumberFormat.Int8LE);
        basic.pause(50);
        let buffer = pins.i2cReadBuffer(addr, 3);

        return String.fromCharCode(buffer[0])+String.fromCharCode(buffer[1])+String.fromCharCode(buffer[2])
    }
}
