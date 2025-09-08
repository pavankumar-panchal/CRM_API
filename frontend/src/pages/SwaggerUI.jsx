import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUIPage = () => {
  // Point to the backend-served OpenAPI JSON (absolute URL to avoid dev-server serving HTML)
  const url = 'http://localhost/CRM_API/backend/docs/openapi.php';
  return (
    <div style={{ height: '100vh' }}>
      <SwaggerUI url={url} />
    </div>
  );
};

export default SwaggerUIPage;
