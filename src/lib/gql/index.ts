import { gql } from "@apollo/client";


const domain = "village-noel-bourges.fr";

export const GET_LAYOUT = gql`
  query layout {
    subsiteLayouts(
      filters: { domain: { eq: "${domain}" } }
    ) {
      data {
        attributes {
          favicon {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          header {
            logo {
              logoImg {
                data {
                  attributes {
                    alternativeText
                    url
                  }
                }
              }
              logoText
            }
          }
          headerMenu {
            ... on ComponentLayoutNavigationItem {
              parent
              children {
                text
                url
                newTab
              }
              position
            }
          }
          hero {
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            mobileImage {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            ctaTitle
            button {
              label
              url
            }
          }
          footer {
            logo {
              logoImg {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              logoText
            }
            columns {
              title
              description
            }
            socialNetworks {
              icon
              url
            }
            copyright
          }
          footerMenu {
            ... on ComponentLayoutNavigationItem {
              parent
              children {
                text
                url
                newTab
              }
              position
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_HOMEPAGE = gql`
  query homepages {
    subsiteHomePages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          site {
            data {
              attributes {
                domain
              }
            }
          }
          edition {
            data {
              attributes {
                year
              }
            }
          }
          exhibitorSection {
            title
            description
            altText
            button {
              label
              url
            }
          }
          lunchSection {
            title
            description
            mediaSwiper {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            button {
              label
              url
            }
            position
          }
          animationSection {
            title
            description
            button {
              label
              url
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_ANIMATION_PAGE = gql`
  query animations {
    subsiteAnimationProgramPages(
      pagination: { page: 1, pageSize: 20 }
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          description
          sections {
            ... on ComponentAnimationsPageAnimationSection {
              id
              image {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              title
              description
              position
              information {
                date
                address
                price
              }
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_EXHIBITOR_DIRECTORY_PAGE = gql`
  query exhibitorDirectoryPage {
    subsiteExhibitorDirectoryPages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_EXHIBITOR_CONTENT = gql`
  query exhibitors {
    subsiteExhibitorContents(
      pagination: { page: 1, pageSize: 300 }
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          description
          tagTitle
          tagValue
          # tag {
          #   data {
          #     attributes {
          #       stand
          #     }
          #   }
          # }
          plan {
            data {
              attributes {
                url
              }
            }
          }
          buttonLabel
          category {
            data {
              attributes {
                name
                parent {
                  data {
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_PARTNER_PAGE = gql`
  query partnerPage {
    subsitePartnerPages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          description
          logoPartner {
            name
            url
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_DINING_PAGE = gql`
  query diningPage {
    subsiteDiningPages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          sections {
            ... on ComponentSectionsWithMediaSwiper {
              title
              description
              mediaSwiper {
                data {
                  attributes {
                    url
                    alternativeText
                  }
                }
              }
              button {
                label
              }
              position
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_SALON_MAP_PAGE = gql`
  query partnerPage {
    subsiteSalonMapPages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          download {
            label
          }
          pdf {
            data {
              attributes {
                alternativeText
                url
                name
              }
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_MEDIA_PAGE = gql`
  query mediasPage {
    subsiteMediaPages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_MEDIAS = gql`
  query medias {
    subsiteMediaContents(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          name
          date
          slug
          category {
            data {
              attributes {
                name
              }
            }
          }
          pdfThumbnail {
            file {
              data {
                attributes {
                  url
                }
              }
            }
          }
          medias {
            ... on ComponentSharedMedia {
              file {
                data {
                  attributes {
                    alternativeText
                    url
                    name
                  }
                }
              }
              text
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_MEDIA_BY_SLUG = gql`
  query medias($slug: String) {
    subsiteMediaContents(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
        slug: { eq: $slug }
      }
    ) {
      data {
        attributes {
          name
          date
          downloadAll
          slug
          category {
            data {
              attributes {
                name
              }
            }
          }
          medias {
            ... on ComponentSharedMedia {
              file {
                data {
                  attributes {
                    alternativeText
                    url
                    name
                  }
                }
              }
              text
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_EXHIBITOR_PAGE = gql`
  query exhibitorPage {
    subsiteExhibitorPages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          description
          emailDestinationAddress
          emailSubject
          titleH2
          filesDownload {
            fileTitle
            document {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
          }
          sections {
            ... on ComponentSectionsWithMedia {
              title
              description
              image {
                file {
                  data {
                    attributes {
                      alternativeText
                      url
                      name
                    }
                  }
                }
              }
              position
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_INFOS_PAGE = gql`
  query infosPage {
    subsitePracticalInfoPages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          mainSection {
            emailDestinationAddress
            emailSubject
            schedules {
              title
              description
            }
            price {
              title
              description
            }
          }
          organization {
            mainAddress {
              title
              description
            }
            annexAddress {
              title
              description
            }
            phone
            mail
            web
            socialNetworks {
              url
              icon
            }
            mapTitle
            mapLat
            mapLng
            mapPopup
          }
          accessSection {
            title
            accessCard {
              title
              description
              icon
              button
              url
            }
          }
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_LEGAL_NOTICES_PAGE = gql`
  query mentionsLegales {
    subsiteLegalNoticePages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          description
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;

export const GET_PRIVACY_POLICY_PAGE = gql`
  query privacyPolicy {
    subsitePrivacyPolicyPages(
      filters: {
        site: { domain: { eq: "${domain}" } }
        edition: { year: { eq: null } }
      }
    ) {
      data {
        attributes {
          title
          description
          seo {
            meta_Title
            meta_Description
          }
        }
      }
    }
  }
`;
