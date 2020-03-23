import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import SINGLE_CHARACTER_QUERY from '../../graphql/single-character';

import Header from '../../components/Header';
import CustomText from '../../components/CustomText';
import BackwardLink from '../../components/BackwardLink';
import withCapitalLetter from '../../util/withCapitalLetter';

function getCharacter(id) {
  const { loading, error, data } = useQuery(SINGLE_CHARACTER_QUERY, {
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
          <BackwardLink
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
          @media screen and (min-width: 415px) {
            div > div {
              width: fit-content;
              margin: 0 auto;
            }
            img {
              min-width: 398px;
              max-width: none;
            }
          }
          @media screen and (min-width: 856px) {
            div > div {
              display: grid;
              grid-template-columns: 1fr 1fr;
              margin: 8px auto 0 auto;
            }
            section {
              border: 2px solid #00b0c7;
            }
          }
        `}</style>
      </div>
    )
}

export default Page;
