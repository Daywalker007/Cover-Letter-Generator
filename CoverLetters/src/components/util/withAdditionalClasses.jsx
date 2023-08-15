import React from 'react';

// HOC function to add a CSS class to a custom button component
const withAdditionalClass = (WrappedComponent, additionalClassName) => {
  return (props) => {
    // Combine the existing class list with the additional class
    const combinedClassName = `${props.className} ${additionalClassName}`;

    // Create a new props object with the updated className
    const updatedProps = { ...props, className: combinedClassName };

    // Return the WrappedComponent with the updated props
    return <WrappedComponent {...updatedProps} />;
  };
};

export default withAdditionalClass