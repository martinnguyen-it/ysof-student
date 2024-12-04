import { useRecoilState, useRecoilValue } from 'recoil'
import { routesElm } from './routes'
import { userInfoState } from '@atom/authAtom'
import { currentSeasonState, selectSeasonState } from '@atom/seasonAtom'
import { useEffect } from 'react'

function App() {
  const userInfo = useRecoilValue(userInfoState)
  const currentSeason = useRecoilValue(currentSeasonState)
  const [selectSeason, setSelectSeason] = useRecoilState(selectSeasonState)

  useEffect(() => {
    if (userInfo && !selectSeason) {
      setSelectSeason(userInfo.seasons_info[userInfo.seasons_info.length - 1].season)
    }
  }, [userInfo, currentSeason])
  return <div>{routesElm}</div>
}

export default App
