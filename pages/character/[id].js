import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import CHARACTER_QUERY from '../../graphql/character';
import Header from '../../components/Header/Header';
import CustomText from '../../components/CustomText/CustomText';
import withCapitalLetter from '../../util/withCapitalLetter';
import HistoryArrowLink from '../../components/HistoryArrow/HistoryArrow';

function getCharacter(id) {
  const { loading, error, data } = useQuery(CHARACTER_QUERY, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data;
}

const Page = () => {
    const { query } = useRouter();
    const { id } = query;
    const { character = {} } = getCharacter(id);
    const { name, image, species, status, location = {}, origin = {} } = character;

    return (
      <div>
        <Header title={`Character: ${name}`} />
        <div>
          <img src={image} alt={name} />
          <HistoryArrowLink
            pattern={'/location/[id]'}
            to={`/location/${location.id}`}
          />
          <section>
            <h2>
              <CustomText style={'bold'}>
                {name}
              </CustomText>
            </h2>
            <ul>
              <li>
                <CustomText style={'normal'}>
                  {location.name}
                </CustomText>
              </li>
              <li>
                <CustomText style={'normal'}>
                  {species}
                </CustomText>
              </li>
              <li>
                <CustomText style={'bold'}>
                  Status:<br />{status}
                </CustomText>
              </li>
              <li>
                <CustomText style={'bold'}>
                  Home planet:<br />{withCapitalLetter(origin.name)}
                </CustomText>
              </li>
            </ul>
          </section>
        </div>
        <style jsx>{`
          div > div {
            position: relative;
          }
          img {
            width: 100%;
            max-width: 414px;
          }
          h2 {
            margin-bottom: 6px;
          }
          section {
            padding: 14px;
          }
          li {
            margin-bottom: 6px;
          }
        `}</style>
      </div>
    )
}

export default Page;
