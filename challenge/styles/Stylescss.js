import { StyleSheet } from "react-native";

export const StylesNew = StyleSheet.create({
  containerHome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    backgroundPosition: "right",
  },

  inputs: {
    fontSize: 13,
    fontWeight: "200"
  },

  CardsHorInfo: {
    width: 160,
    height: 90,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 6,
  },

  containerReg: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 25,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    height: "80%", width: "94%",
  },

  container2: {
    flex: 1,
    backgroundColor: "#f01111",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  parrafo: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  viewHome1: {

    alignItems: "center",
    gap: 20,

  },
  buttonSignIn: {
    backgroundColor: "orange",
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonTextSignIn: {
    color: "#FFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  signUpText: {
    color: "#393939",
    fontSize: 14,
  },
  signUpLink: {
    color: "#7847E0",
    fontWeight: "bold",
    textAlign: "center",
  },
  carrousellProd: {
    borderRadius: 30,
    width: 330,
    height: 200,
    marginHorizontal: 5
  },
}); 