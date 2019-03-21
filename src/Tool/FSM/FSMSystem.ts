class FSMSystem
{
    private states: FSMState[] = [];

    private _currentStateID: number;

    private _currentState: FSMState;

    public get currentStateID(): number
    {
        return this._currentStateID;
    }

    public get currentState(): FSMState
    {
        return this._currentState;
    }

    public FSMSystem()
    {
        this.states = [];
    }

    public addState(s: FSMState)
    {
        if (s == null)
        {
            console.log("FSMSystem Error: Null FSMState");
        }
        if (this.states.length == 0)
        {
            this.states.push(s);
            this._currentState = s;
            this._currentStateID = s.id;
            return;
        }
        for (let i = 0; i < this.states.length; i++)
        {
            if (this.states[i].id == s.id)
            {
                console.log("FSMSystem Error: FSMState:" + s.id.toString() + "already been added");
                return;
            }
        }
        this.states.push(s);
    }

    public deleteState(id: number)
    {
        if (id == 0)
        {
            console.log("FSMSystem Error: NullStateID");
            return;
        }

        for (let i = 0; i < this.states.length; i++)
        {
            if (this.states[i].id == id)
            {
                this.states.splice(i, 1);
                return;
            }
        }
        console.log("FSMSystem Error:" + id.toString() + "not has");
    }

    public performTransition(trans: number)
    {
        if (trans == 0)
        {
            console.log("FSMSystem Error: NullTransition");
            return;
        }
        let outputState: number = this._currentState.getOutputState(trans);
        if (outputState == 0)
        {
            console.log("FSMSystem Error:" + this._currentStateID.toString() + " does not have a target state  for transition " + trans.toString());
            return;
        }
        this._currentStateID = outputState;

        for (let i = 0; i < this.states.length; i++)
        {
            if (this.states[i].id == this._currentStateID)
            {
                this._currentState.doBeforeLeaving();
                this._currentState = this.states[i];
                this._currentState.doBeforeEntering();
                break;
            }
        }
    }
}