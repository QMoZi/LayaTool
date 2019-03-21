class Maths
{

    public static round(d: number, decimals: number)
    {
        return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    public static randomFloat(min: number, max: number)
    {
        return Math.random() * (max - min) + min;
    }

    public static randomInt(min: number, max: number)
    {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static randomBoolean(): boolean
    {
        return Math.random() > 0.5 ? true : false;
    }

    public static randomArray(array: any[]): any[]
    {
        let newArray = this.deepClone(array);
        newArray.sort(function g(a, b)
        {
            return Math.random() > 0.5 ? -1 : 1;
        });
        return newArray;
    }

    public static deepClone(array: any[]): any[]
    {
        let newArray: any[] = [];
        for (let i = 0; i < array.length; i++)
        {
            newArray.push(array[i]);
        }
        return newArray;
    }
}