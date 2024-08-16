import { render, screen } from "@testing-library/react-native";

import { NextDays } from "@components/NextDays";
import clearDay from "@assets/clear_day.svg"

describe("Component: NextDays", () => {
  it("should be render day.", () => {
    render(
      <NextDays
        data={[
          { day: '18/07', min: '30°', max: '33°c', icon: clearDay, weather: 'Céu limpo' },
          { day: '19/07', min: '31°', max: '32°c', icon: clearDay, weather: 'Nublado' },
          { day: '20/07', min: '32°', max: '31°c', icon: clearDay, weather: 'Céu limpo' },
          { day: '21/07', min: '33°', max: '30°c', icon: clearDay, weather: 'Céu limpo' },
          { day: '22/07', min: '34°', max: '29°c', icon: clearDay, weather: 'Chuva fraca' },
        ]}
      />
    )

    expect(screen.getByText('18/07')).toBeTruthy();
  })
})