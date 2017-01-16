const policy_string=`Neighborhood Software Terms of Service and Privacy Policy

1. Terms

  By accessing the website at https://kindle-highlight-manager.herokuapp.com/, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.

2. Use License

  
    
      Permission is granted to temporarily download one copy of the materials (information or software) on Neighborhood Software's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

      
        modify or copy the materials;
        use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
        attempt to decompile or reverse engineer any software contained on Neighborhood Software's website;
        remove any copyright or other proprietary notations from the materials; or
        transfer the materials to another person or "mirror" the materials on any other server.
      
    
    This license shall automatically terminate if you violate any of these restrictions and may be terminated by Neighborhood Software at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
  

3. Disclaimer

  
    The materials on Neighborhood Software's website are provided on an 'as is' basis. Neighborhood Software makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
    Further, Neighborhood Software does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
  

4. Limitations

  In no event shall Neighborhood Software or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Neighborhood Software's website, even if Neighborhood Software or a Neighborhood Software authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.

5. Accuracy of materials

  The materials appearing on Neighborhood Software's website could include technical, typographical, or photographic errors. Neighborhood Software does not warrant that any of the materials on its website are accurate, complete or current. Neighborhood Software may make changes to the materials contained on its website at any time without notice. However Neighborhood Software does not make any commitment to update the materials.

6. Links

  Neighborhood Software has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Neighborhood Software of the site. Use of any such linked website is at the user's own risk.

7. Modifications

  Neighborhood Software may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.

8. Governing Law

  These terms and conditions are governed by and construed in accordance with the laws of Nebraska and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.

Privacy Policy

  Your privacy is important to us.

  It is Neighborhood Software's policy to respect your privacy regarding any information we may collect while operating our website. Accordingly, we have developed this privacy policy in order for you to understand how we collect, use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy below.

  
    We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.
    Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.
    We will collect and use personal information solely for fulfilling those purposes specified by us and for other ancillary purposes, unless we obtain the consent of the individual concerned or as required by law.
    Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.
    We will protect personal information by using reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
    We will make readily available to customers information about our policies and practices relating to the management of personal information.
    We will only retain personal information for as long as necessary for the fulfilment of those purposes.
  

  We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. Neighborhood Software may change this privacy policy from time to time at Neighborhood Software's sole discretion.
`;

var highlights = require('./highlights');
var highlight = require('./highlight');

function isLoggedIn(req, res, next) {
        console.log("req.isAuthenticated() " + req.isAuthenticated())
        if (req.isAuthenticated())
            return next();
        
        res.redirect('/');
}

module.exports = (routes, passport) => {
    routes.get('/', (req, res) => {
        res.status(200).json(
        {
            "message": "root"
        });
    });
    routes.get('/highlights', isLoggedIn, highlights);
    routes.get('/highlight/:id', isLoggedIn, highlight);

    routes.get('/privacy_policy', (req, res) => {
        res.status(200).json({'policy': policy_string});
    });
    
    routes.get(
      '/amazon/auth/callback', 
      passport.authenticate('amazon', {failureRedirect: '/'}),    
      (req, res) => {
        console.log("at /amazon/auth/callback");
        res.redirect('/highlights');
    });

    routes.get(
        '/login',
        passport.authenticate(
            'amazon',
            {scope: ['profile']}
        ),
        (req, res) => {
          console.log('the impossible happened');
        }
      )
}
