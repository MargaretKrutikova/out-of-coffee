import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import { Global, css, ThemeProvider } from '@emotion/react';
import { Header } from './components';

import { Orders, Favorites } from './views';

function App() {
  const theme = {
    colors: {
      greenLantern: 'rgba(25, 122, 23, 0.54)',
      pitchBlack: '#000000',
    },
  };

  const globalStyles = css`
    p {
      weight: 400;
      font-size: 14px;
    }
  `;

  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Header />
        <Tabs>
          <TabList>
            <Tab>Beställning</Tab>
            <Tab>Basorder och Favoriter</Tab>
            <Tab>Three</Tab>
            {/* Just nu jobbar Victor här */}
            <Tab>Border box dev area</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>Beställningar!</p>
            </TabPanel>
            <TabPanel>
              <Favorites />
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <Orders />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ThemeProvider>
    </>
  );
}

export default App;
