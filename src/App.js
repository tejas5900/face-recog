import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Signinform from './components/Signinform/Signinform';
import Register from './components/Register/Register';
import DetectionBox from './components/DetectionBox/DetectionBox';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

const particlesOptions=
{
  particles:{
    number:{
      value:30,
      density:{
        enable:true,
        value_area:200
      }
    }
  }
  }


class App extends Component {
  
    constructor()
    {
      super();
      this.state={
        input:'',
        imageUrl:'',
        box: {},
        route: 'signin',
        isSignedin: false,
        user: {
          id: '',
          name: '',
          email: '',
          password: '',
          entries: '',
          joined: '',
        }
      }
    }


    loadUser= (data)=>
    {
      this.setState({user:{
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password,
          entries: data.entries,
          joined: data.joined,
      }})
    }


    calculateFaceLocation=(responsedata)=>{
      const clarifaiFace =responsedata.outputs[0].data.regions[0].region_info.bounding_box;
      const img=document.getElementById('inputimage');
      const height=Number(img.height);
      const width=Number(img.width);
      return{
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row *height,
        rightCol:  width- (clarifaiFace.right_col* width),
        bottomRow: height- (clarifaiFace.bottom_row* height),
      }
    }

    displayFaceBox= (box)=>
    {

      this.setState({box: box});
    }

    onInputChange=(event) => {
      this.setState({input: event.target.value});
    }

    onButtonSubmit=()=>
    {
     this.setState({imageUrl: this.state.input});
     fetch('http://localhost:5000/imageurl',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input:this.state.input,
    } )
  }).then(response=> response.json())
     .then(response => {
      if(response){
        fetch('http://localhost:5000/image',{
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id:this.state.user.id,
        } )
      }).then(response=>response.json())
      .then(count =>{
        this.setState(Object.assign(this.state.user, { entries: count}))
      })
    }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })

      .catch(err=>console.log(err));
  }

    onRouteChange=(route)=>
    {
      if(route === 'signout')
      {
        this.setState({isSignedin:false});
      }
      else 
      {
        this.setState({isSignedin: true});
      }
      this.setState({route: route});
    }


    render(){
      const {route,isSignedin,imageUrl,box}=this.state;
    return (
    <div className="App">
      <Particles className="particles"
      params={particlesOptions}
      />
      <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin}/>
      { this.state.route === 'home'
         ? <div>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} />
            <DetectionBox box={box} imageUrl={imageUrl} />
          </div>
         : (
           route === 'signin'
            ?<Signinform loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
         )
      }
    </div>
     
  );
}
}
export default App;
