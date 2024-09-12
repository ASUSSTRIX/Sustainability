import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import TabContent from '../../../components/common/TabContent';
import SaveButton from '../../../components/common/Button/Savebutton';
import NextButton from '../../../components/common/Button/Nextbutton';
import { fetchData } from '../../../services/apiService';
import { setActiveTabKey, setPillarData, setLoading, setIsSaved } from '../../../redux/slices/goalsSlice';
import Resetbtn from '../../../components/common/Button/Resetbtn';
import "./Goals.css"

const Goal = () => {
  const dispatch = useDispatch();
  const { activeTabKey, pillarData, loading, isSaved } = useSelector((state) => state.goals);

  useEffect(() => {
    const fetchPageData = async () => {
      dispatch(setLoading(true));
      try {
        const result = await fetchData();
        dispatch(setPillarData(result));
      } catch (error) {
        console.error('Error fetching page content:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchPageData();
  }, [dispatch]);

  const handleGoalsSave = () => {
    dispatch(setIsSaved(true));
  };

  const handleNextClick = () => {
    const currentIndex = pillarData.findIndex(
      (item) => item.pillarName === activeTabKey
    );
    const nextIndex = (currentIndex + 1) % pillarData.length;
    dispatch(setActiveTabKey(pillarData[nextIndex].pillarName));
    dispatch(setIsSaved(false));
  };

  const items = pillarData.map((pillar) => ({
    key: pillar.pillarName,
    label: pillar.pillarName,
    children: <TabContent pillar={pillar} />,
  }));

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Tabs
          activeKey={activeTabKey}
          items={items}
          onChange={(key) => dispatch(setActiveTabKey(key))}
          tabBarStyle={{
            backgroundColor: '#014D4E',
            height: '45px',
            marginBottom: 0,
          }}
          className="custom-tabs  bg-white mb-[17px] rounded-t-[20px] rounded-b-[20px] w-[976px] h-auto shadow-md"
          tabBarGutter={0}
        />
      )}
      <br />
      <div className="w-[975px]  flex justify-end gap-2.5">
        <Resetbtn/>
        <SaveButton onClick={handleGoalsSave} />
        <NextButton isSaved={isSaved} onClick={handleNextClick} />
      </div>
      <br />
    </div>
  );
};

export default Goal;
