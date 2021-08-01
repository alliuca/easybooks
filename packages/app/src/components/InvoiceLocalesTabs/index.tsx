import React from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import MyIcon from 'components/Icon';
const { TabPane } = Tabs;

interface Props extends TabsProps {
  locales: string[];
}

const InvoiceLocalesTabs: React.FunctionComponent<Props> = ({ activeKey, onChange, locales }) => {
  return (
    <Tabs
      onChange={onChange}
      activeKey={activeKey}
      // onEdit={this.onLocaleEdit}
      type="editable-card"
    >
      {locales.map(locale => (
        <TabPane
          key={locale}
          tab={
            <span>
              <MyIcon type={`icon-locale-${locale.toLowerCase()}`} />
            </span>
          }
          closable={true}
        />
      ))}
    </Tabs>
  );
};

export default InvoiceLocalesTabs;
