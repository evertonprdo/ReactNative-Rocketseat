import { useEffect } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { BlurMask, Canvas, Circle, Path, Skia, usePathValue } from '@shopify/react-native-skia';

import { styles } from './styles';
import { THEME } from '@styles/theme';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = TouchableOpacityProps & {
  checked: boolean;
  title: string;
}

const CHECK_SIZE = 20;
const CHECK_STROKE = 2;

export function Option({ checked, title, ...rest }: Props) {
  const percentage = useSharedValue(0)
  const circle = useSharedValue(0)

  const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2;
  const CENTER_CIRCLE = RADIUS / 2.3;

  const path = Skia.Path.Make();
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS );

  useEffect(() => {
    if(checked) {
      percentage.value = withTiming(1, { duration: 700 })
      circle.value = withTiming(CENTER_CIRCLE, { duration: 700, easing: Easing.bounce })
    } else {
      percentage.value = withTiming(0, { duration: 700 })
      circle.value = withTiming(0, { duration: 300 })
    }
  }, [checked])

  return (
    <TouchableOpacity
      style={
        [
          styles.container,
          checked && styles.checked
        ]
      }
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={THEME.COLORS.GREY_500}
          style={"stroke"}
          strokeWidth={CHECK_STROKE}
        />

        <Path
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style={"stroke"}
          strokeWidth={CHECK_STROKE}
          start={0}
          end={percentage}
        >
          <BlurMask blur={1} style={"solid"}/>
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={circle}
          color={THEME.COLORS.BRAND_LIGHT}
        >
          <BlurMask blur={4} style={"solid"}/>
        </Circle>
      </Canvas>
    </TouchableOpacity>
  );
}