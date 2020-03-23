import Link from 'next/link';

const BackwardLink = (props) => {
  let href, as;
  switch(props.to) {
    case 'main':
      href = "/";
      as = "/";
      break;
    case 'location':
      href = "/location/[id]";
      as = `/location/${props.id}`;
      break;
    default:
      href='';
      as='';
  }

  return (
    <Link href={props.pattern} as={props.to}>
    <a>
      <img src="/images/arrow.svg" alt="Backwards" />
      <style jsx>{`
        a {
            display: block;
            position: absolute;
            top: 9px;
            left: 13px;
        }
      `}</style>
    </a>
  </Link>
  )
}

export default BackwardLink;
