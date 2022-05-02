import {
	StyleSheet,
	Dimensions,
} from "react-native";

export const styles = StyleSheet.create({
  TextButtonText: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 20,
    alignSelf: "center",
    textAlign:"right",
  },
  loginButton: { 
    backgroundColor: "white",
    width: "80%",
    borderRadius: 20,
    marginTop: "15%"
  },
  container:{
    backgroundColor: "green",
    borderRadius: 20,
    width: Dimensions.get("screen").width-50,
    height: Dimensions.get("screen").height/1.7,
    display:"flex",
    flexDirection: "column",
    alignItems:"center",
    justifyContent:"flex-start",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: Dimensions.get("screen").height*.1,
    paddingTop: Dimensions.get("screen").height*.05,
  },
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		width: "75%",
		backgroundColor: "#F8F8F8",
		borderColor: "#A8A8A8",
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 10,
		alignSelf: "center"
	},
	inputIcon: {
		marginLeft: 10,
	},
	inputBox: {
		flex: 1,
		width:"60%",
		color: "#525252",
		fontSize: 16,
		padding: 10,
		fontWeight:"bold"
	},
	invalidInput:{
		borderColor: "red",
		borderWidth: 2
	}

});
