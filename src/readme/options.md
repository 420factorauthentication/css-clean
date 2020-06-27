# Options
**line_break**&nbsp; &nbsp; &nbsp; Number  
**tab_size**&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Number  
**tab_char** &nbsp; &nbsp; &nbsp; &nbsp;"space" or "tab"  

## Media Queries

-  [**m_feat_indent_size**](#m_feat_indent_size)  
-  [**m_feat_start_justify**](#m_feat_start_justify)  
-  [**m_feat_end_justify**](#m_feat_end_justify)  
-  [**m_type_justify**](#m_type_justify)  
-  [**m_feat_start_br**](#m_feat_start_br)  
-  [**m_feat_end_br**](#m_feat_end_br)  

#### m_feat_indent_size
The amount of spaces to indent each media feature in a media query.

`"m_feat_indent_size": 8`

    @media
            (orientation   : landscape)
            and (min-width : 480px)
            and (max-width : 767px) {

    }

#### m_feat_start_justify
Determines alignment for everything left of the colon in media features.  
(exception: media types are handled by m_type_justify)

`"m_feat_start_justify": "left"`

    @media
      only print
      and (max-width      : 767px),
      (min-width          : 1919px)
      and (orientation    : landscape)
      and (min-resolution : 72dpi) {

    }

`"m_feat_start_justify": "right"`

    @media
      only print
           and (max-width : 767px),
               (min-width : 1919px)
         and (orientation : landscape)
      and (min-resolution : 72dpi) {

    }

`"m_feat_start_justify": "op_left"`

    @media
      only print
      and  (max-width      : 767px),
           (min-width      : 1919px)
      and  (orientation    : landscape)
      and  (min-resolution : 72dpi) {

    }

`"m_feat_start_justify": "op_right"`

    @media
      only print
      and       (max-width : 767px),
                (min-width : 1919px)
      and     (orientation : landscape)
      and  (min-resolution : 72dpi) {

    }

#### m_feat_end_justify
Determines alignment for everything right of the colon in media features.

`"m_feat_end_justify": "left"`

    @media
      only print
      and (max-width      : 767px),
      (min-width          : 1919px)
      and (orientation    : landscape)
      and (min-resolution : 72dpi) {

    }

`"m_feat_end_justify": "right"`

    @media
      only print
      and (max-width      :     767px),
      (min-width          :    1919px)
      and (orientation    : landscape)
      and (min-resolution :     72dpi) {

    }

#### m_type_justify
Determines alignment for media types.

`"m_type_justify": "left"`

    @media
      only print
      and (max-width      : 767px),
      (min-width          : 1919px)
      and (orientation    : landscape)
      and (min-resolution : 72dpi) {

`"m_type_justify": "left_left"`

    }

    @media
      only                  print
      and (max-width      : 767px),
      (min-width          : 1919px)
      and (orientation    : landscape)
      and (min-resolution : 72dpi) {

    }


`"m_type_justify": "left_right"`  
`"m_feat_end_justify": "right"`

    @media
      only                       print
      and (max-width      :     767px),
      (min-width          :    1919px)
      and (orientation    : landscape)
      and (min-resolution :     72dpi) {

    }


`"m_type_justify": "right_left"`  
`"m_feat_start_justify": "right"`

    @media
                     only   print
           and (max-width : 767px),
               (min-width : 1919px)
         and (orientation : landscape)
      and (min-resolution : 72dpi) {

    }


`"m_type_justify": "right_right"`  
`"m_feat_start_justify": "right"`  
`"m_feat_end_justify": "right"`

    @media
                     only        print
           and (max-width :     767px),
               (min-width :    1919px)
         and (orientation : landscape)
      and (min-resolution :     72dpi) {

    }

#### m_feat_start_br
Number of line breaks before set of media features.

`"m_feat_start_br": 0`

    @media (min-width : 480px)
      and (max-width  : 767px)
      and (min-height : 480px) {

    }

`"m_feat_start_br": 1`

    @media
      (min-width      : 480px)
      and (max-width  : 767px)
      and (min-height : 480px) {

    }

`"m_feat_start_br": 2`

    @media

      (min-width      : 480px)
      and (max-width  : 767px)
      and (min-height : 480px) {

    }

#### m_feat_end_br
Number of line breaks after set of media features.

`"m_feat_end_br": 0`

    @media
      (min-width      : 480px)
      and (max-width  : 767px)
      and (min-height : 480px) {

    }

`"m_feat_end_br": 1`

    @media
      (min-width      : 480px)
      and (max-width  : 767px)
      and (min-height : 480px)
    {

    }

`"m_feat_end_br": 2`

    @media
      (min-width      : 480px)
      and (max-width  : 767px)
      and (min-height : 480px)

    {

    }
