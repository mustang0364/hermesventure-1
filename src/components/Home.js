import React, { Component } from 'react';
import Scenes from './Scenes.js';
import BackgroundVideoOne from '../Media/Videos/Snow.mp4'
import BackgroundVideoTwo from '../Media/Videos/Beach.mp4'
import BackgroundVideoThree from '../Media/Videos/Rainforest.mp4'
import SidebarImg from '../Media/Images/sidebar.png';
import TopArrow from '../Media/Images/arrowtop.png';
import BottomArrow from '../Media/Images/arrowbottom.png';
import axios from 'axios';
import ButtonImage from '../Media/Images/Scenebuttons-inactive.png';
import Buttonactive from '../Media/Images/Scenebuttons.png';
import circle from '../Media/Images/Logo/circle.png';
import WhiteLogo from '../Media/Images/Logo/circleWhiteR.png'
import BlackLogo from '../Media/Images/Logo/circleLogoRBlack.png'
import BlueLogo from '../Media/Images/Logo/circleLogoBlueR.png' 
import NameWhite from '../Media/Images/Logo/bootsNameWhite.png'
import NameBlue from '../Media/Images/Logo/bootsNameBlue.png'
import DashboardArrow from '../Media/Images/dashboard-arrow.png';
import './home.css';


import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(){
      super();
  
      this.state = {
        videoOneShown: true,
        videoTwoShown: false,
        videoThreeShown: false,
        fpTibet: [],
        fpMaldives: [],
        fpPeru: [],
        currentScene: 'Tibet'
      }
    }
    componentDidMount(){
        this.updateTibetFP();
        this.updatePeruFP();
        this.updateMaldivesFP();
    }
    updateTibetFP = () => {
      setTimeout(() => {
        axios.get('/api/fptibet').then(res => {
          this.setState({
            fpTibet: res.data,
          })
          return res.data.productOneCategory
        })
      }, 1000);
    }
    updatePeruFP = () => {
      setTimeout(() => {
        axios.get('/api/fpperu').then(res => {
          this.setState({
            fpPeru: res.data,
          })
        })
      }, 1000);
    }
    updateMaldivesFP = () => {
      setTimeout(() => {
        axios.get('/api/fpmaldives').then(res => {
          this.setState({
            fpMaldives: res.data,
          })
        })
      }, 1000);
    }
    changeSceneOne = () => {
      this.setState({
        videoOneShown: true,
        videoTwoShown: false,
        videoThreeShown: false,
        currentScene: 'Tibet',
      })
    }
    changeSceneTwo = () => {
      this.setState({
        videoOneShown: false,
        videoTwoShown: true,
        videoThreeShown: false,
        currentScene: 'Maldives',
      })
    }
    changeSceneThree = () => {
      this.setState({
        videoOneShown: false,
        videoTwoShown: false,
        videoThreeShown: true,
        currentScene: 'Peru',
      })
    }
  
    render() {
      
      return (
        <div className="Home">
        <div className={this.state.videoOneShown ? 'videoshown' : 'videohidden'}>
        <Scenes video={BackgroundVideoOne} />
        </div>
        <div className={this.state.videoTwoShown ? 'videoshown' : 'videohidden'}>
        <Scenes video={BackgroundVideoTwo} />
        </div>
        <div className={this.state.videoThreeShown ? 'videoshown' : 'videohidden'}>
        <Scenes video={BackgroundVideoThree} />
        </div>
        <img className='homelogo' src={
          this.state.videoOneShown 
          ? BlackLogo
          : this.state.videoTwoShown
          ? BlueLogo
          : this.state.videoThreeShown 
          ? WhiteLogo
          : null} alt="" />

          <img className='name' src={
          this.state.videoOneShown 
          ? NameWhite
          : this.state.videoTwoShown
          ? NameBlue
          : this.state.videoThreeShown 
          ? NameWhite
          : null} alt=""/>

         <div className="sidebar">
            <div className="sidebarheader">
                <h2 className='feat' >FEAT</h2>
                <div className='featuredsidebar'><h2>URED</h2><hr/></div>
               
                <h4>In This Scene</h4>
                <div className="bottomsection">
                  
                  <div className="fpbg">
                      <Link className='fp1' onClick={() => this.props.redirect()} to={`/api/shopping/${
                        this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productOneCategory
                        : this.state.currentScene === 'Maldves'
                        ? this.state.fpMaldives.productOneCategory
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productOneCategory
                        : this.state.fpTibet.productOneCategory
                        }/${
                          this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productOneid
                        : this.state.currentScene === 'Maldives'
                        ? this.state.fpMaldives.productOneid
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productOneid
                        : this.state.fpTibet.productOneid
                        }`}>
                      <img className='productimagesb' id="featuredProduct" src={
                        this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productOneimage
                        : this.state.currentScene === 'Maldives'
                        ? this.state.fpMaldives.productOneimage
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productOneimage
                        : this.state.fpTibet.productOneimage                        
                        } alt='' /></Link>
                      <img src={circle} alt="circleLogo"/>
                  </div>
                  <div className="fpbg">
                      <Link onClick={() => this.props.redirect()} to={`/api/shopping/${
                        this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productTwoCategory
                        : this.state.currentScene === 'Maldves'
                        ? this.state.fpMaldives.productTwoCategory
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productTwoCategory
                        : this.state.fpTibet.productTwoCategory
                        }/${
                          this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productTwoid
                        : this.state.currentScene === 'Maldives'
                        ? this.state.fpMaldives.productTwoid
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productTwoid
                        : this.state.fpTibet.productTwoid
                        }`}>
                      <img className='productimagesb' src={
                        this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productTwoimage
                        : this.state.currentScene === 'Maldives'
                        ? this.state.fpMaldives.productTwoimage
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productTwoimage
                        : this.state.fpTibet.productTwoimage                        
                        } alt=''/></Link>
                      <img src={circle} alt="circleLogo"/>
                  </div>
                  <div className="fpbg">
                      <Link onClick={() => this.props.redirect()} to={`/api/shopping/${
                        this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productThreeCategory
                        : this.state.currentScene === 'Maldves'
                        ? this.state.fpMaldives.productThreeCategory
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productThreeCategory
                        : this.state.fpTibet.productThreeCategory
                        }/${
                          this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productThreeid
                        : this.state.currentScene === 'Maldives'
                        ? this.state.fpMaldives.productThreeid
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productThreeid
                        : this.state.fpTibet.productThreeid
                        }`}>
                      <img className='productimagesb' src={
                        this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productThreeimage
                        : this.state.currentScene === 'Maldives'
                        ? this.state.fpMaldives.productThreeimage
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productThreeimage
                        : this.state.fpTibet.productThreeimage                        
                        } alt=''/></Link>
                      <img src={circle} alt="circleLogo"/>
                  </div>
                  <div className="fpbg">
                      <Link onClick={() => this.props.redirect()} to={`/api/shopping/${
                        this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productFourCategory
                        : this.state.currentScene === 'Maldves'
                        ? this.state.fpMaldives.productFourCategory
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productFourCategory
                        : this.state.fpTibet.productFourCategory
                        }/${
                          this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productFourid
                        : this.state.currentScene === 'Maldives'
                        ? this.state.fpMaldives.productFourid
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productFourid
                        : this.state.fpTibet.productFourid
                        }`}>
                      <img className='productimagesb' src={
                        this.state.currentScene === 'Tibet' 
                        ? this.state.fpTibet.productFourimage
                        : this.state.currentScene === 'Maldives'
                        ? this.state.fpMaldives.productFourimage
                        : this.state.currentScene === 'Peru'
                        ? this.state.fpPeru.productFourimage
                        : this.state.fpTibet.productFourimage                        
                        } alt=''/></Link>
                      <img src={circle} alt="circleLogo"/>
                  </div>
                  
                </div>
            </div>
            <img className='sidebarimg' src={SidebarImg} alt="sidebarsection"/>
        </div>
        
        <div className="buttonsection">
            <img className='arrows' src={TopArrow} alt="arrowtop"/>
            <button onClick={() => this.changeSceneOne()}><img alt='' className={this.state.videoOneShown === true ? 'buttonactive' : 'buttoninactive'} src={this.state.videoOneShown === true ? Buttonactive : ButtonImage} />
            </button>
            <button onClick={() => this.changeSceneTwo()}><img alt='' className={this.state.videoTwoShown === true ? 'buttonactive' : 'buttoninactive'} src={this.state.videoTwoShown === true ? Buttonactive : ButtonImage} /></button>
            <button onClick={() => this.changeSceneThree()}><img alt='' className={this.state.videoThreeShown === true ? 'buttonactive' : 'buttoninactive'} src={this.state.videoThreeShown === true ? Buttonactive : ButtonImage} /></button>
            <img className='arrows' src={BottomArrow} alt="arrowbottom"/>
        </div>
            <div className="footer">        
              <a className='dashboardlink'href="#dashboard"><img src={DashboardArrow} alt=""/></a>
            </div>
        </div>
      );
    }
  }
  
  export default Home;
