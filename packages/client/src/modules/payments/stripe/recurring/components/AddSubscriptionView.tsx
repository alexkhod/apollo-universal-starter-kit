import React from 'react';
import Helmet from 'react-helmet';
import { Elements } from 'react-stripe-elements';

import { TranslateFunction } from '../../../../../i18n';
import { LayoutCenter, clientOnly, Table, Row, Col } from '../../../../common/components/index.web';
import { PageLayout } from '../../../../common/components/web';
import SubscriptionCardForm from './SubscriptionCardFormView';
import settings from '../../../../../../../../settings';
import { CreditCardInput } from '../types';

const ElementsClientOnly = clientOnly(Elements);

interface AddSubscriptionViewProps {
  t: TranslateFunction;
  submitting: boolean;
  onSubmit: (subscriptionInput: CreditCardInput, stripe: any) => void;
  error: string | null;
}

export default (props: AddSubscriptionViewProps) => {
  const { t } = props;

  return (
    <PageLayout>
      <Helmet title={`${settings.app.name} - ${t('title')}`} />
      <h1 className="text-center">{t('subTitle')}</h1>
      <Row>
        <Col xs={6}>
          <p>{t('add.description')}</p>
          <p>{t('add.product')}</p>
          <p>
            {t('add.price')} {settings.payments.stripe.recurring.plan.amount / 100}
          </p>
        </Col>
        <Col xs={6}>
          {/* Displays testing credit cards when stripe test keys are used!!!*/}
          {settings.payments.stripe.recurring.publicKey.includes('test') && renderTestingCards(t)}
        </Col>
      </Row>
      <LayoutCenter>
        <h3 className="text-center"> {t('add.creditCard')}</h3>

        <ElementsClientOnly>
          <SubscriptionCardForm {...props} buttonName={t('add.btn')} />
        </ElementsClientOnly>
      </LayoutCenter>
    </PageLayout>
  );
};

/**
 * Renders test credit cards table.
 *
 * @param t - The translate function.
 * @return Returns header and table with test credit cards
 */
const renderTestingCards = (t: TranslateFunction) => {
  const testCreditCard = [
    {
      id: 1,
      number: '4242 4242 4242 4242',
      type: 'visa',
      date: '02/22',
      csv: '242',
      zip: '42424'
    },
    {
      id: 2,
      number: '5555 5555 5555 4444',
      type: 'Mastercard',
      date: '02/22',
      csv: '242',
      zip: '42424'
    },
    {
      id: 3,
      number: '3782 8224 6310 005',
      type: 'American Express',
      date: '02/22',
      csv: '242',
      zip: '42424'
    }
  ];

  const columns = [
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type',
      render(text: string) {
        return <span>{text}</span>;
      }
    },
    {
      title: 'number',
      dataIndex: 'number',
      key: 'number',
      render(text: string) {
        return <span>{text}</span>;
      }
    },
    {
      title: 'date',
      dataIndex: 'date',
      key: 'date',
      render(text: string) {
        return <span>{text}</span>;
      }
    },
    {
      title: 'csv',
      dataIndex: 'csv',
      key: 'csv',
      render(text: string) {
        return <span>{text}</span>;
      }
    },
    {
      title: 'zip',
      dataIndex: 'zip',
      key: 'zip',
      render(text: string) {
        return <span>{text}</span>;
      }
    }
  ];

  return (
    <div>
      <h5 className="text-center">{t('add.testCreditCards')}</h5>
      <Table style={{ fontSize: '13px' }} dataSource={testCreditCard} columns={columns} />
    </div>
  );
};