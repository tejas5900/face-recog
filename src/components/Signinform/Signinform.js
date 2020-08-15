import React,{Component} from 'react';


class Signinform extends Component{
    constructor(props){
        super(props);
        this.state={
            signinEmail:'',
            signinPassword: '',  
              }
    }

    onEmailChange=(event)=>
    {
        this.setState({signinEmail: event.target.value});
    };

    onPasswordChange=(event)=>
    {
        this.setState({signinPassword: event.target.value});
    };

    onSubmitSign=(event)=>{
        event.preventDefault();
        fetch('http://localhost:5000/signin/', { 
        method:'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            email:this.state.signinEmail,
            password: this.state.signinPassword,
        })
    }).then(response=>response.json())
        .then( data=> {
            if(data.id)
            {
                this.props.loadUser(data);
                this.props.onRouteChange('home');
            }
        })
      }

    render(){
    const {onRouteChange}=this.props;
        return(
            <article className="br5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address"
                            onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password" 
                            onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={this.onSubmitSign}
                        className="f6 link dim br-pill ba ph3 pv2 mb2 dib black bg-transparent"
                         type="submit" value="   Sign in    " />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={()=>onRouteChange('register')} href="#0" className="f6 link dim black db underline">Register</p>
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Signinform;