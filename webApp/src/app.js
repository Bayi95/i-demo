import React from 'react'
import ReactDOM from 'react-dom'
import 'whatwg-fetch';

import Header from './HeaderComponent'
import Footer from './FooterComponent'
const Hello = React.createClass({
    render(){
       return(
                <div>
                    <Header/>
                    项目模板
                    <Footer/>
                </div>
            )
    },
    componentDidMount(){
       fetch('/api/users')
            .then(function(response){
                 return response.json()
            })
            .then(function(data){
                console.log(data)
            })
    }
})

ReactDOM.render(<Hello/>, document.getElementById('app'))