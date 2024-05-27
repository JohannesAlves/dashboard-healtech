import useListUsersTemplate from './model';
import ListUsersTemplateView from './view';

const ListUsersTemplate = () => {
  const listUsersTemplateModel = useListUsersTemplate();

  return <ListUsersTemplateView {...listUsersTemplateModel} />;
};

export default ListUsersTemplate;
