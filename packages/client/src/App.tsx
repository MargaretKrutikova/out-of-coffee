import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';


function App() {
  
  return (
    <>
    <h2>FOODURA</h2>
    <Tabs>
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
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
