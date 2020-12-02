import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#B6DAFC',
  white: '#ffffff',
  black: '#000000',
  yellow: '#FDF60A',
  button: "#FFC261",
  black: "#363636",
  button: '#B6DAFC',
  grey:'#545454',
  lightblue: '#92C5C6'
};

const style = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  main:{
    flex:1,
    backgroundColor:"white"
  },
  container:{
    flex:1,
    padding:22
  },
  poppinsbold: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 27,
    color:"#545454"
  },
  poppinsmedium: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color:"#545454"
  },
  poppinsbutton: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color:"#545454"
  },
  nunitosans: {
    fontFamily: "NunitoSans-Regular",
    fontSize: 16,
    color:"#545454"
  },
  nunitosansemi: {
    fontFamily: "NunitoSans-SemiBold",
    fontSize: 12,
    color:"gray"
  },
  button: {
    backgroundColor: "#92B1CD",
    borderRadius: 5,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: "center",
  },
  line: {
    backgroundColor: 'lightgray',
    height: 1,
    marginTop: 15,
  },
});

export default style;
