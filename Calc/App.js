/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class App extends Component<void> {

	constructor(){
		super()
		this.state={
			calculationText:'',
			resultText:''
		}
		this.operations = ['DEL','+','-','*','/']
	}
	
	buttonPressed(text){
		if(text=='='){
			return this.validate() && this.calculateResult();
		}
		this.setState({
			calculationText:this.state.calculationText+text
		})
	}

	validate(){
		switch(this.state.calculationText.slice(-1)){
			case '+':
			case '-':
			case '*':
			case '/':
				return false;
		}
		return true;
	}

	operationPressed(text){
		switch (text) {
			case 'DEL':{
				let text = this.state.calculationText.split('');
				text.pop();
				this.setState({
					calculationText: text.join('')
				});
				break;
			}
			case '+':
			case '-':
			case '*':
			case '/':{
				const lastChar = this.state.calculationText.split('').pop()
				if(this.operations.indexOf(lastChar)>0) return
				if(this.state.calculationText=='') return
				this.setState({calculationText: this.state.calculationText+text})
			}

		}
	}

	calculateResult(){
		this.setState({
			resultText:eval(this.state.calculationText)
		})
	}

	render() {
		let nums = [[1,2,3],[4,5,6],[7,8,9],[0,'.','=']]
		let rows=[]
		let ops = []
		for(let i=0;i<4;i++){
			let row=[];
			for(let j=0;j<3;j++){
				row.push(<TouchableOpacity style={styles.btn} onPress={()=> this.buttonPressed(nums[i][j])}><Text style={styles.btnText}>{nums[i][j]}</Text></TouchableOpacity>)
			}
			rows.push(<View style={styles.row}>{row}</View>)
		}

		for(let i=0;i<5;i++){
			ops.push(<TouchableOpacity style={styles.btn} onPress={()=> this.operationPressed(this.operations[i])}><Text style={styles.btnText}>{this.operations[i]}</Text></TouchableOpacity>)
		}

		return (
		<View style={styles.container}>
			<View style={styles.calculation}>
				<Text style={styles.calculationText} numberOfLines = {1}>{this.state.calculationText}</Text>
			</View>
			<View style={styles.result}>
				<Text style={styles.resultText}>{this.state.resultText}</Text>
			</View>
			<View style={styles.button}>
				<View style={styles.numbers}>
					{rows}
				</View>
				<View style={styles.operations}>
					{ops}
				</View>
			</View>
		</View>
		);
	}
}

const styles = StyleSheet.create({
    container:{
		flex:1,
		backgroundColor:'white'
	},
	calculation:{
		flex:2,
		justifyContent: 'center',
		alignItems:'flex-end'
	},
	result:{
		flex:1,
		justifyContent: 'center',
		alignItems:'flex-end'
	},
	button:{
		flex:6,
		flexDirection:'row'
	},
	numbers:{
		flex:3,
		backgroundColor:'#2F343A',
		justifyContent:'space-around'
	},
	operations:{
		flex:1,
		backgroundColor:'#15A678',
		justifyContent:'space-around'
	},
	calculationText: {
		fontSize:36,
		color:"#000000"
	},
	resultText:{
		fontSize:24,
		color:"#000000"
	},
	row:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-around'
	},
	btn:{
		flex:1,
		alignSelf:'stretch',
		justifyContent:'center',
		alignItems:'center'
	},
	btnText:{
		fontSize:30,
		color:'white'
	}
});
