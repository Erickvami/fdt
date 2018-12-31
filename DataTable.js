import React, { Component } from 'react';
import {Table,Column,Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css'
import {FormControl,FormGroup,Glyphicon} from 'react-bootstrap';
//import { TextCell } from './helpers/cells';
import Dimensions from 'react-dimensions';
import * as firebase from 'firebase';
import loadingIcon from './loading.gif'
class DataTable extends Component{
    constructor(props){
        super(props);
              this.state=
                  {
                  tableName:props.source,
                  rows:[],
                  search:'',
                  filteredRows:[],
                  sort:'asc',
                  columns:[],
                  width:1000,
                  height:600,
                  widthPercentage:props.widthPercentage/100,
                  heightPercentage:props.heightPercentage/100,
                  isReady:false
                  };
        
        this._renderRowText= this._renderRowText.bind(this);
        this.Resize= this.Resize.bind(this);
        this.Sorting= this.Sorting.bind(this);
        this.RenderHeader= this.RenderHeader.bind(this);
        this.Search= this.Search.bind(this);
        this.RenderTableBody= this.RenderTableBody.bind(this);
        this.RenderLoading= this.RenderLoading.bind(this);
    }
    componentDidMount(){
          //Creates firebase configuration object 
        var config = {
    apiKey: "AIzaSyAVxeL_3pxm8hNn0P4xobVu1m9hUmx1WWc",
    authDomain: "example1-6f0a9.firebaseapp.com",
    databaseURL: "https://example1-6f0a9.firebaseio.com",
    projectId: "example1-6f0a9",
    storageBucket: "example1-6f0a9.appspot.com",
    messagingSenderId: "357685722626"
  };
//Initialize database        
  firebase.initializeApp(config);
        //Query
       const rootRef= firebase.database().ref().child(this.state.tableName);//.orderByChild('Name').equalTo('Erick');
        rootRef.on('value',snap=>{
            //Set state rows from database source
        this.setState({
           rows:snap.val(),
           filteredRows:snap.val(),
            columns:Object.keys(snap.val()[0]),
            isReady:true
        });    
        });
         window.addEventListener("resize", this.Resize);
        //console.log(this.state);
    }
     _renderRowText(row) {
        console.log(row);
        //console.log(this);
        return <Cell>{this.state.filteredRows[row.rowIndex][row.columnKey]}</Cell>
    }
    Resize(){   this.setState({width:window.innerWidth*this.state.widthPercentage,height:window.innerHeight*this.state.heightPercentage});
        //console.log(this.state);
    }
    Sorting(header){
              //console.log(header.target.id)
        //header.target.style.color="blue";
        if(this.state.sort==='asc'){
            this.setState({
            filteredRows:this.state.filteredRows.sort(function (a, b) {
  if (a[header.target.id] < b[header.target.id]) {
    return 1;
  }
  if (a[header.target.id] > b[header.target.id]) {
    return -1;
  }
  // a must be equal to b
  return 0;
}),
                sort:this.state.sort==='asc'? 'desc':'asc'
        });
            
        }
        else{
            this.setState({
            filteredRows:this.state.filteredRows.sort(function (a, b) {
  if (a[header.target.id] > b[header.target.id]) {
    return 1;
  }
  if (a[header.target.id] < b[header.target.id]) {
    return -1;
  }
  // a must be equal to b
  return 0;
}),
                sort:this.state.sort==='asc'? 'desc':'asc'
        });
        }
        
  
       
    }
    componentWillMount(){
        this.Resize();
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.Resize);
    }
    RenderHeader(header){
        console.log(header);
        return <div>
            <label style={{cursor:'pointer',textTransform:'capitalize'}} id={header.columnKey} onClick={this.Sorting}>{header.columnKey} <Glyphicon id={header.columnKey} onClick={this.Sorting}glyph="sort" /></label>
            <FormGroup>
            <FormControl  id={header.columnKey} type='text' placeholder='search' onChange={this.Search} />
            </FormGroup></div>; 
    }
    Search(v){
        this.setState({
            //selectedSearch:v.target.id,
            //search:v.target.value,
            filteredRows: this.state.rows.filter(value=> value[v.target.id].toString().toLowerCase().includes(v.target.value.toLowerCase()))
        });
    }
    RenderTableBody(){
        return this.state.columns.map(function (header, i) {
                    return <Column
                        columnKey={header}
                        cellDataKey={header}
                        header={this.RenderHeader}
                        cell={this._renderRowText}
                        width={100}
                        isResizable={true}
                        flexGrow={1}
                    />
                },this)
    }
    RenderLoading(){
        return <Column
                        columnKey={''}
                        cellDataKey={''}
                        header={''}
                        cell={<img style={{width:'120px'}} src={loadingIcon} />}
                        width={100}
                        isResizable={true}
                        flexGrow={1}
                    />
    }
    render(){
        return <center><div>
            <Table 
        rowsCount={this.state.isReady?this.state.filteredRows.length:1} 
        rowHeight={this.state.isReady?40:100} 
        headerHeight={80} 
        width={this.state.width} 
        height={this.state.height}
        rowGetter={function (rowIndex) {
            return this.state.filteredRows[rowIndex];
        }.bind(this)}
            >
                 {this.state.isReady? this.RenderTableBody():this.RenderLoading()}
            </Table>
            </div>
        </center>
    }
}

export default DataTable;
