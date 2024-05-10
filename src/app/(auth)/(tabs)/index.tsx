import { SafeAreaView } from "react-native-safe-area-context";
import HomePage from "../../../screens/HomePage";

const Home = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#151718" }}>
      <HomePage />
    </SafeAreaView>
  );
};

export default Home;
