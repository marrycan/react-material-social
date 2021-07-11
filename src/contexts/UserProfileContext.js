import PropTypes from 'prop-types';
import { createContext } from 'react';

const initialState = {
  themeMode: 'dark',
  themeDirection: 'ltr',
  themeColor: 'orange',
  onChangeMode: () => {},
  onChangeDirection: () => {},
  onChangeColor: () => {},
  setColor: PRIMARY_COLOR[4],
  colorOption: []
};

const ProfileContext = createContext(initialState);

ProfileProvider.propTypes = {
  children: PropTypes.node
};

function ProfileProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: 'dark',
    themeDirection: 'ltr',
    themeColor: 'default'
  });

  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value
    });
  };

  const onChangeDirection = (event) => {
    setSettings({
      ...settings,
      themeDirection: event.target.value
    });
  };

  const onChangeColor = (event) => {
    setSettings({
      ...settings,
      themeColor: event.target.value
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        ...settings,
        // Mode
        onChangeMode,
        // Direction
        onChangeDirection,
        // Color
        onChangeColor,
        setColor: SetColor(settings.themeColor),
        colorOption: PRIMARY_COLOR.map((color) => ({
          name: color.name,
          value: color.main
        }))
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileProvider, ProfileContext };