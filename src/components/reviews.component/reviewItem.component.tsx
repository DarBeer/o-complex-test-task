

export function ReviewItem(props: { className: string, htmlContent: string }) {
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: props.htmlContent }}
      className={props.className}
    />
  );
}