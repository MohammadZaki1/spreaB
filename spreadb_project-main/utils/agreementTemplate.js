export const agreementTemplate = (campaignTitle, brandName, influencerName) => `
  <div style="font-family:Arial;padding:20px;">
    <h2 style="text-align:center;">Influencer Agreement Contract</h2>
    <p>This agreement is for the campaign: <b>${campaignTitle}</b></p>

    <h3>Parties Involved</h3>
    <p><b>Brand Owner:</b> ${brandName}</p>
    <p><b>Influencer:</b> ${influencerName}</p>

    <h3>Terms</h3>
    <p>Influencer agrees to create content as defined in the campaign brief...</p>

    <br><br>
    <div style="margin-top:40px;">
      ___________________________<br/>
      Influencer Signature
    </div>
  </div>
`;
