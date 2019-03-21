class Dictionary<KT, VT> {
    private keys: KT[] = [];
    private values: VT[] = [];
    public get count(): number
    {
        return this.Count();
    }

    public constructor()
    {
    }

    public Add(key: any, value: any): number
    {
        this.keys.push(key);
        return this.values.push(value);
    }

    public Remove(key: any)
    {
        let index = this.keys.indexOf(key, 0);
        this.RemoveAt(index);
    }

    public RemoveAt(index: number): boolean
    {
        if (index >= this.keys.length)
        {
            return false;
        }
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
        return true;
    }

    private Count(): number
    {
        return this.keys.length;
    }

    public SetDicValue(key: any, value: any): boolean
    {
        let index = this.keys.indexOf(key, 0);
        if (index != -1)
        {
            this.keys[index] = key;
            this.values[index] = value;
            return true;
        }
        return false;
    }

    public TryGetValue(key: KT): VT
    {
        let index = this.keys.indexOf(key, 0);
        if (index != -1)
        {
            return this.values[index];
        }
        return null;
    }

    public ContainsKey(key: any): boolean
    {
        let ks = this.keys;
        for (let i = 0; i < ks.length; ++i)
        {
            if (ks[i] == key)
            {
                return true;;
            }
        }
        return false;
    }

    public GetKeyAt(index: number): KT
    {
        if (index >= this.keys.length)
        {
            return null;
        }
        return this.keys[index];
    }

    public GetValueAt(index:number):VT
    {
        if (index >= this.values.length)
        {
            return null;
        }
        return this.values[index];
    }

    public GetKeys(): KT[]
    {
        return this.keys;
    }

    public GetValues(): VT[]
    {
        return this.values;
    }
}