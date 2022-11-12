import * as React from 'react';
import Badge from "./Badge";
import Actviti from '../clients/Actviti';
import LoaderWithText from './LoaderWithText';

export default function Panel(props) {
  const { activity, closePanel } = props;
  const [fetchedActivity, setFetchedActivity] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [requiresLoad, setRequiresLoad] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false)
    console.log('sel ac', activity)
  }, [activity])

  const hasPhotos = () => {
    console.log("activity", activity)
    console.log("activity.activity", activity.activity)
    return activity.activity.photos?.length > 0
  }

  const photosEl = () => {
    if (!hasPhotos()) { return }

    return (
      <div className="mr-4 bg-white w-full h-40 overflow-x-auto flex">
        {activity.activity.photos.map((photo) => {
          return (
            <img className="flex-none object-cover w-40 h-40 hover:opacity-90" src={photo.url}></img>
          )
        })}
      </div>
    )
  }

  const content = () => {
    if (isLoading || (activity?.id !== activity?.id)) {
      return <LoaderWithText text='Fetching your activity' width={50} height={50} /> 
    } else {
      return (
        <div>
          <div className="flex items-start justify-between">
            <div>
              {activity.icon()}
              <span className="ml-2 text-sm text-gray-700">{activity.startDateLong()}</span>
            </div>
            <div className="ml-3 flex h-7 items-center">
              <button onClick={closePanel} type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">Close panel</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">{activity.name()}</h2>
          <div className="mt-3">
            {photosEl()}
          </div>
          <div className="flex justify-between mt-3">
            <div>
              <div>
                <span className="text-2xl">{activity.distance()}</span>
                <span className="text-md">km</span>
              </div>
              <span className="block text-gray-500 text-xs">Distance</span>
            </div>
            <div>
              <div>
                <span className="text-2xl">{activity.movingTime()}</span>
              </div>
              <span className="block text-gray-500 text-xs">Moving Time</span>
            </div>
            <div>
              <div>
                <span className="text-2xl">{activity.totalElevationGain()}</span>
                <span className="text-md">m</span>
              </div>
              <span className="block text-gray-500 text-xs">Elevation</span>
            </div>
          </div>

                    <table className="mt-3 min-w-full divide-y divide-gray-300">
                      <tbody className="bg-white">
                        <tr>
                          <td className="whitespace-nowrap pr-3 text-sm font-light">Elapsed Time</td>
                          <td className="whitespace-nowrap px-2 text-sm font-medium text-gray-900">{activity.elapsedTime()}</td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap pr-3 text-sm font-light">Max Speed</td>
                          <td className="whitespace-nowrap px-2 text-sm font-medium text-gray-900">{activity.maxSpeed()} <span className="text-xs font-light">km/hr</span></td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap pr-3 text-sm font-light">Average Speed</td>
                          <td className="whitespace-nowrap px-2 text-sm font-medium text-gray-900">{activity.averageSpeed()} <span className="text-xs font-light">km/hr</span></td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap pr-3 text-sm font-light">Max Heartrate</td>
                          <td className="whitespace-nowrap px-2 text-sm font-medium text-gray-900">{activity.maxHeartrate()} <span className="text-xs font-light">bpm</span></td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap pr-3 text-sm font-light">Average Heartrate</td>
                          <td className="whitespace-nowrap px-2 text-sm font-medium text-gray-900">{activity.averageHeartrate()} <span className="text-xs font-light">bpm</span></td>
                        </tr>
                      </tbody>
                    </table>



        </div>
      )
    }
  }

  return(
    <div className="drop-shadow-lg flex-none hidden md:block w-96 px-6 py-6 bg-white overflow-auto rounded-l-xl z-500 -ml-4">
      {content()}
    </div>
  )
}
