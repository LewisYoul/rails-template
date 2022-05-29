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
    setIsLoading(true)

    Actviti.activity(activity.id)
      .then(res => {
        setIsLoading(false)
        setFetchedActivity(res.data)
      })
      .catch(console.error)
  }, [activity])

  const hasPhotos = () => {
    return fetchedActivity?.photos.length > 0
  }

  const photosEl = () => {
    if (!hasPhotos()) { return }

    return (
      <div className="divide-x-4 divide-white mr-4 bg-gray-200 w-full h-40 overflow-x-auto flex bg-black">
        {fetchedActivity.photos.map((photo) => {
          return (
            <img className="flex-none object-cover w-40 h-40 hover:opacity-90" src={photo.url.replace('-48x64.', '-576x768.').replace('-64x48.', '-768x576.')}></img>
          )
        })}
      </div>
    )
  }

  const content = () => {
    if (isLoading || (activity?.id !== fetchedActivity?.id)) {
      return <LoaderWithText text='Fetching your activity' width={50} height={50} /> 
    } else {
      return (
        <div>
          <div className="flex items-start justify-between">
            <div>
              <Badge className={`${activity.bgColorClass()} ${activity.textColorClass()}`}>{activity.type()}</Badge>
              <span className="ml-2 text-sm text-gray-700">{activity.startDateLong()}</span>
            </div>
            <div className="ml-3 flex h-7 items-center">
              <button onClick={closePanel} type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">Close panel</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">{activity.name()}</h2>
          <div className="mt-3">
            {photosEl()}
          </div>
        </div>
      )
    }
  }

  return(
    <div className="flex-none hidden md:block w-96 px-6 py-6 bg-white overflow-auto">
      {content()}
    </div>
  )
}
