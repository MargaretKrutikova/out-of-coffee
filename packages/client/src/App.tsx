import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';


import { Orders } from './views';

function App() {
  return (
    <>
    <h2>FOODURA</h2>
    <Tabs>
      <TabList>
        {/* Just nu jobbar Victor här */}
        <Tab>Beställning</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Orders />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </>
  );
}

export default App;
