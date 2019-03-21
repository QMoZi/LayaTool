abstract class FSMState
{
    protected map: Dictionary<number, number> = new Dictionary<number, number>();

    protected stateID: number;

    public get id()
    {
        return this.stateID;
    }

    public addTransition(trans: number, id: number)
    {
        if (trans == 0)
        {
            console.log("FSMState Error: NullTransition");
            return;
        }
        if (id == 0)
        {
            console.log("FSMState Error: NullStateID");
            return;
        }
        if (this.map.ContainsKey(trans))
        {
            console.log("FSMState Error: Map already has TransitionID: " + trans.toString());
            return;
        }
        this.map.Add(trans, id);
    }

    public deleteTransition(trans: number)
    {
        if (trans == 0)
        {
            console.log("FSMState Error: NullTransition");
            return;
        }
        if (this.map.ContainsKey(trans))
        {
            this.map.Remove(trans);
            return;
        }
        console.log("FSMState Error: Map not has TransitionID:" + trans.toString());
    }

    public getOutputState(trans: number): number
    {
        if (this.map.ContainsKey(trans))
        {
            return this.map.TryGetValue(trans);
        }
        return 0;
    }

    public abstract doBeforeEntering();

	public abstract doBeforeLeaving();

	public abstract reason();

	public abstract act();
}