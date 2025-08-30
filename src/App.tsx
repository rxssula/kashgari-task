import { SplitLayout } from "@googlemaps/extended-component-library/react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

function App() {
  return (
    <div className="h-screen">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <SplitLayout rowLayoutMinWidth={700}>
          <div className="text-2xl h-full" slot="fixed">
            Hello
          </div>
          <div className="h-full" slot="main">
            <Map></Map>
          </div>
        </SplitLayout>
      </APIProvider>
    </div>
  );
}

export default App;
