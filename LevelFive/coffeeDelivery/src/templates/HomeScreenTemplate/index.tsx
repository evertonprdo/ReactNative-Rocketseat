import { TopBarHome } from "@components/TopBarHome copy";
import { Dimensions, ScrollView, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

type Props = {
  headerComponent?: React.ReactNode
  stickyBodyComponent?: React.ReactNode
  children?: React.ReactNode
}

export default function HomeScreenTemplate({ headerComponent, stickyBodyComponent, children }: Props) {
  const scrollY = useSharedValue(0);

  return (
    <View style={{ flex: 1 }}>

      <TopBarHome interpolateValue={scrollY} />

      <ScrollView
        onScroll={(event) => scrollY.value = event.nativeEvent.contentOffset.y}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        decelerationRate={"fast"}
      >
        {headerComponent}

        {stickyBodyComponent ?? <></>}
        {children}
      </ScrollView>
    </View>
  )
}