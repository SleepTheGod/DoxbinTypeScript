export default function HomePage() {
  return (
    <>
      <div className="center-content">
        <svg
          className="devil-logo"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
          strokeWidth="2"
        >
          <path d="M100 40 L85 20 L90 10 L100 5 L110 10 L115 20 L100 40 Z" />
          <path d="M100 40 L115 20 L120 10 L130 5 L140 10 L145 20 L130 40 L100 40 Z" />
          <circle cx="85" cy="90" r="3" fill="#ffffff" />
          <circle cx="115" cy="90" r="3" fill="#ffffff" />
          <path d="M100 60 Q80 65 70 80 Q65 90 65 100 Q70 130 85 145 Q95 155 100 160 Q105 155 110 125 Q130 130 135 100 Q135 90 130 80 Q120 65 100 60 Z" />
          <path d="M75 100 Q80 110 90 115" strokeLinecap="round" />
          <path d="M125 100 Q120 110 110 115" strokeLinecap="round" />
          <path d="M90 125 Q95 135 100 140 Q105 135 110 125" strokeLinecap="round" />
          <path d="M70 80 L60 75 L55 80 L60 85 Z" />
          <path d="M130 80 L140 75 L145 80 L140 85 Z" />
        </svg>

        <div className="center-links">
          <a href="https://t.me/doxbin" target="_blank" rel="noopener noreferrer">
            Doxbin Telegram Group
          </a>
          <a href="https://twitter.com/doxbin" target="_blank" rel="noopener noreferrer">
            Official Doxbin Twitter
          </a>
          <a href="https://doxbin.org" target="_blank" rel="noopener noreferrer">
            Mirror Doxbin.org
          </a>
        </div>
      </div>

      <div className="search-container">
        <label className="search-label">Search for a paste</label>

        <form className="search-form">
          <input type="text" className="search-box" placeholder="Search for..." />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <div className="showing-text">Showing 150 (of 61809 total) pastes</div>

      <div className="pagination">
        <a href="javascript:void(0)">&laquo;</a>
        <a href="javascript:void(0)" className="active">
          1
        </a>
        <a href="javascript:void(0)">2</a>
        <a href="javascript:void(0)">3</a>
        <a href="javascript:void(0)">4</a>
        <a href="javascript:void(0)">5</a>
        <a href="javascript:void(0)">...</a>
        <a href="javascript:void(0)">413</a>
        <a href="javascript:void(0)">&raquo;</a>
      </div>

      <div className="pinned-pastes">
        <h2>Pinned Pastes</h2>
        <table id="pinnedTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Comments</th>
              <th>Views</th>
              <th>Created by</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="/dox/1">zalgo poor retard</a>
              </td>
              <td>55</td>
              <td>2251</td>
              <td>
                <a href="/users/blade69">blade69</a>
              </td>
              <td>Apr 21st, 2022</td>
            </tr>
            <tr>
              <td>
                <a href="/dox/2">jackson.bz</a>
              </td>
              <td>11</td>
              <td>957</td>
              <td>
                <a href="/users/stephen">stephen</a>
              </td>
              <td>Apr 15th, 2022</td>
            </tr>
            <tr className="green-row">
              <td>
                <a href="/dox/3">How to Ensure Your Paste Stays Up</a>
              </td>
              <td>-</td>
              <td>44455</td>
              <td>
                <a href="/users/charge">charge [Mod]</a>
              </td>
              <td>Nov 20th, 2020</td>
            </tr>
            <tr className="red-row">
              <td>
                <a href="/dox/4">Transparency Report</a>
              </td>
              <td>-</td>
              <td>61755</td>
              <td>
                <a href="/users/le-Medamist">le Medamist</a>
              </td>
              <td>Jun 20th, 2020</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="all-pastes">
        <table id="allPastesTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Comments</th>
              <th>Views</th>
              <th>Created by</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody id="allPastesBody">
            <tr>
              <td>
                <a href="/dox/5">Gia Moreno DOXXED EZ HEXED JEWELS XX</a>
              </td>
              <td>0</td>
              <td>8</td>
              <td>
                <a href="/users/archive">Archive</a>
              </td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <a href="/dox/6">Fivy 🔥Foreign OaBrokeBoy</a>
              </td>
              <td>0</td>
              <td>9</td>
              <td>Anonymous</td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <a href="/dox/7">how to make sure you pasts stay up</a>
              </td>
              <td>0</td>
              <td>15</td>
              <td>
                <a href="/users/lurs">lurs</a>
              </td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <a href="/dox/8">damn</a>
              </td>
              <td>0</td>
              <td>13</td>
              <td>
                <a href="/users/lurs">lurs</a>
              </td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <a href="/dox/9">129932132</a>
              </td>
              <td>0</td>
              <td>12</td>
              <td>Anonymous</td>
              <td>Apr 28th, 2022</td>
            </tr>
            <tr>
              <td>
                <a href="/dox/10">Mark Zuckerberg Facebook CEO</a>
              </td>
              <td>0</td>
              <td>18</td>
              <td>
                <a href="/users/geoMan1984">GeoMan1984</a>
              </td>
              <td>Apr 28th, 2022</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pagination" id="bottomPagination">
        <a href="javascript:void(0)">&laquo;</a>
        <a href="javascript:void(0)" className="active">
          1
        </a>
        <a href="javascript:void(0)">2</a>
        <a href="javascript:void(0)">3</a>
        <a href="javascript:void(0)">4</a>
        <a href="javascript:void(0)">5</a>
        <a href="javascript:void(0)">...</a>
        <a href="javascript:void(0)">413</a>
        <a href="javascript:void(0)">&raquo;</a>
      </div>
      <div className="showing-text" style={{ marginBottom: "40px" }}>
        Showing 150 (of 61809 total) pastes
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        // Client-side JavaScript for dynamic loading can be added here
        console.log('Doxbin clone loaded');
      `,
        }}
      />
    </>
  )
}
