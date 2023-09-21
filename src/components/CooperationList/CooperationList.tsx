import React from 'react';
import Cooperation from '../Сooperation/Сooperation';

interface CooperationListProps {
  suppliers: CooperationData[];
}

interface  CooperationData {
  logo: string;
  name: string;
  categories: string[];
}

const CooperationList: React.FC< CooperationListProps> = ({ suppliers }) => {
  return (
    <div className="suppliers-list">
      {suppliers.map((supplier, index) => (
        < Cooperation
          key={index}
          logo={supplier.logo}
          name={supplier.name}
          categories={supplier.categories}
          onCollaborate={() => {
            // Обработчик начала сотрудничества с поставщиком
            alert(`Вы начали сотрудничество с ${supplier.name}`);
          }}
        />
      ))}
    </div>
  );
};

export default CooperationList;